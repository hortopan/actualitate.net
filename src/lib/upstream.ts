import GhostContentAPI from '@tryghost/content-api';
import { getImageURL } from "$lib/helpers";
import striptags from 'striptags';
import { JSON_CONFIG, type PostOrPageInternal, type RETURN_DATA } from '$lib/types';
import Config from '$lib/config';
import { error } from '@sveltejs/kit';
import isRedirect from '$lib/redirects';
import { redirect } from '@sveltejs/kit';
import redis from '$lib/redis';
import axios from 'axios';

// const GHOST_URL = 'http://127.0.0.1:3001';
// const GHOST_KEY = 'b8fa409a36fc2ac0ff1375f9f2';


const api = GhostContentAPI({
    url: Config.ghost_url,
    key: Config.ghost_key,
    version: 'v5.0',
    // we are fixing issue with internally avoiding redirects when not using https
    // @ts-ignore
    makeRequest: ({ url, method, params, headers }) => {
        headers['X-Forwarded-Proto'] = 'https';
        // @ts-ignore
        return axios[method](url, {
            params,

            // @ts-ignore
            paramsSerializer: (parameters) => {
                return Object.keys(parameters).reduce((parts, k) => {
                    const val = encodeURIComponent([].concat(parameters[k]).join(','));
                    // @ts-ignore
                    return parts.concat(`${k}=${val}`);
                }, []).join('&');
            },
            headers
        });
    }
});

function processNewsItem(post: PostOrPageInternal): PostOrPageInternal {

    if (!post.feature_image) {

        // get first image from post
        const firstImage = post.html?.match(/<img src="([^"]+)"([^>]*)>/)?.[1];
        if (firstImage) {
            post.feature_image = firstImage;
        }

    }

    if (post.feature_image) {
        const featured_image = post.feature_image;
        post.feature_image = getImageURL(featured_image, 1200, 1200);
        post.thumb_image = getImageURL(featured_image, 600, 600, 'cover');
    }

    if (!post.meta_description) {
        // extract first paragraph
        const firstParagraph = post.html?.match(/<p>(.*?)<\/p>/)?.[1];
        if (firstParagraph) {
            post.meta_description = striptags(firstParagraph);
        }
    }


    if (post.primary_tag) {
        // @ts-ignore
        post.category = post.primary_tag;
        // @ts-ignore
        post.category.url = Config.url + '/c/' + post.primary_tag.slug;
    }


    if (post.html) {
        post.html = post.html.replace(/<img src="([^"]+)"([^>]*)>/g, (_match: any, src: string, rest: any) => {
            return `<img src="${getImageURL(src.replace('&#x3D;', '='))}" ${rest}>`;
        });
    }

    if (!post.page) {
        post.url = Config.url + '/a/' + post.slug;
    } else {
        post.url = Config.url + '/' + post.slug;
    }

    return post;
}

async function getConfig(): Promise<JSON_CONFIG> {

    if (!Config.cache_disabled) {
        const cache = await redis.get('config');
        if (cache) {
            return JSON_CONFIG.parse(JSON.parse(cache));
        }
    }

    let jsonConfig: JSON_CONFIG = undefined;

    try {
        // always get config page
        const config = await api.pages.read({ slug: 'config' });
        if (config) {
            // extract json from first html
            const d = config.html?.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];

            if (d) {
                const json = JSON.parse(d.trim());
                jsonConfig = JSON_CONFIG.parse(json);
            }
        }

        if (jsonConfig) {
            await redis.set('config', JSON.stringify(jsonConfig));
        }

        return jsonConfig;

    } catch (e) {
        console.error(`/config page does not exist`, e);
    }
}

export async function getData(path: string): Promise<RETURN_DATA> {

    if (!Config.cache_disabled) {
        const page_cache = await redis.hGet('page', path);
        if (page_cache) {
            const data = JSON.parse(page_cache);

            if (data.lastModified) {
                data.lastModified = new Date(data.lastModified);
            }

            return data;
        }
    }

    const data = await _getData(path);
    await redis.hSet('page', path, JSON.stringify(data));
    return data;
}

async function _getData(path: string): Promise<RETURN_DATA> {

    const is_redirect = await isRedirect(path);

    if (is_redirect) {
        throw redirect(301, `${Config.friendly_url}${is_redirect}`);
    }

    // ignore anything that might be an image or js , css
    if (path.match(/\.(jpg|jpeg|png|gif|js|css|svg|ico|webp|woff|woff2|ttf|otf|eot|map|txt)$/)) {
        throw error(404, 'Not found');
    }


    if (path.startsWith('/a/')) {
        let data = await api.posts.read({ slug: path.slice(3) }, { include: 'tags' });

        data = processNewsItem(data as PostOrPageInternal);

        const lastModified = new Date(data.updated_at || data.published_at || Date.now());

        const meta = {
            title: data.meta_title || data.title || '',
            description: data.meta_description || data.excerpt,
            canonical: data.canonical_url || `https://${Config.domain}${path}`,
            image: data.feature_image
        }

        // get new posts
        // @ts-ignore
        let more: any = await api.posts.browse({ limit: 9, order: 'published_at DESC', include: 'tags', filter: [`id:-${data.id}`] });
        more = more.map((post: any) => processNewsItem(post));

        return {
            type: 'post',
            data,
            more,
            lastModified,
            path,
            meta,
            config: await getConfig()
        };
    }

    if (path === '/') {
        let data: any = await api.posts.browse({ limit: 30, order: 'published_at DESC', include: 'tags', filter: ['tag:-config'] });

        data = data.map((post: any) => processNewsItem(post));

        // header last modified from ghost
        let lastModified: Date | undefined = undefined;

        // get newest post date
        if (data.length > 0) {
            lastModified = new Date(data[0].updated_at || data[0].published_at || Date.now());
        }

        const meta = {
            title: 'Ultimele știri',
            description: 'Actualitate.net - Ultimele știri',
            canonical: `https://${Config.domain}${path}`
        }

        return {
            type: 'category',
            data,
            lastModified,
            path,
            meta,
            config: await getConfig()
        }
    }

    if (path.startsWith('/c/')) {

        let page = 1;

        // is this pagination if it ends with /page:number
        const end = path.split('/').pop();
        if (end && end.match(/^page:[0-9]+$/)) {

            const pn = parseInt(end.split(':')[1], 10);
            if (isNaN(pn)) {
                throw error(404, 'Not found');
            }

            path = path.replace(/\/page:[0-9]+$/, '');

            console.log('page', pn);

            page = pn;
        }


        let data: any = await api.posts.browse({ limit: 30, page, order: 'published_at DESC', filter: [`tag:${path.slice(3)}`], include: 'tags' });
        if (data.length === 0) {
            throw error(404, 'Category not found');
        }

        const pagination = data.meta?.pagination

        data = data.map((post: any) => processNewsItem(post));

        let lastModified: Date | undefined = undefined;

        // get newest post date
        if (data.length > 0) {
            lastModified = new Date(data[0].updated_at || data[0].published_at || Date.now());
        }

        const meta = {
            title: data[0].category.meta_title || data[0].category.name,
            description: data[0].category.description,
            canonical: `https://${Config.domain}${path}`
        }

        return {
            type: 'category',
            data,
            lastModified,
            path,
            meta,
            pagination,
            config: await getConfig()
        }


    }

    // check if contains invalid characters for a slug
    if (path.match(/[^a-z0-9\-\/]/)) {

        // check if image , video, or js, css
        if (path.match(/\.(jpg|jpeg|png|gif|js|css|svg|ico|webp|woff|woff2|ttf|otf|eot|map|txt)$/)) {
            throw error(404, 'Not found, invalid slug');
        }
    }

    let data = await api.pages.read({ slug: path.slice(1) }, { include: 'tags' });

    data = processNewsItem(data);

    const is_config = data.tags?.find((tag: any) => tag.name === "config");
    if (is_config) {
        throw error(404, 'Page not found');
    }

    const lastModified = new Date(data.updated_at || data.published_at || Date.now());

    const meta = {
        title: data.meta_title || data.title || '',
        description: data.meta_description || data.excerpt,
        canonical: data.canonical_url || data.url || ''
    }

    return {
        type: 'page',
        data,
        lastModified,
        path,
        meta,
        config: await getConfig()
    }
}
