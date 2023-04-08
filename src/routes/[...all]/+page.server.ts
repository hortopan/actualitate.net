import type { ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import Config from '$lib/config';
import { getData } from '$lib/upstream';
import { RETURN_DATA } from '$lib/types';

export const csr = true;

export async function load({ url, locals }: ServerLoadEvent): Promise<RETURN_DATA> {

    try {

        const data = await getData(url.pathname);

        data.site_config = {
            friendly_description: Config.friendly_description,
            friendly_name: Config.friendly_name,
            friendly_url: Config.friendly_url,
        }

        // header last modified from ghost

        if (data.lastModified) {
            locals.responseHeaders.set('Last-Modified', data.lastModified.toUTCString());
        }
        // set cache
        locals.responseHeaders.set('Cache-Control', 'public, max-age=60');


        return data;

    } catch (e: any) {

        if (e.status && e.status > 300 && e.status < 400) {
            console.log(e);
            throw e;
        }

        if (e.status && e.body) {
            throw e;
        }

        throw error(e?.response?.status || 500, e.message);
    }



};
