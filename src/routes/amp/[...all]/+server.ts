import type { RequestHandler } from './$types';
import { getData } from '$lib/upstream';
import AMP from './amp.svelte';
import Config from '$lib/config';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params, locals, request }) => {

    const path = url.pathname.replace('/amp', '');

    try {
        const data = await getData(path);

        const last_modified = data.lastModified;

        data.site_config = {
            friendly_name: Config.friendly_name,
            friendly_description: Config.friendly_description,
            friendly_url: Config.friendly_url,
        }

        if (last_modified) {
            locals.responseHeaders.set('Last-Modified', last_modified.toUTCString());
        }
        locals.responseHeaders.set('Cache-Control', 'public, max-age=30');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const rendered = AMP.render({ context: data });

        let customCss = rendered.head.match(/(<style amp-custom.*?>.*<\/style>)/gims);
        if (!customCss) {
            customCss = `<style amp-custom>${rendered.css.code}</style>`;
            rendered.head = rendered.head + customCss;
        } else {
            const replace = customCss[0].replace('</style>', `${rendered.css.code}</style>`);
            rendered.head = rendered.head.replace(customCss[0], replace.replace('@charset "UTF-8";', ''));
        }

        const response = new Response(rendered.html.replace('!REPERIO_HEAD!', rendered.head));
        response.headers.set('Content-Type', 'text/html; charset=UTF-8');
        response.headers.set('Cache-Control', 'public, max-age=60');
        if (last_modified) {
            response.headers.set('Last-Modified', last_modified.toUTCString());
        }
        return response;

    } catch (e: any) {

        if (e.status && e.body) {
            throw e;
        }

        throw error(e?.response?.status || 500, e.message);
    }


}
