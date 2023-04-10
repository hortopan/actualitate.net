import type { Handle } from '@sveltejs/kit';
import Config from '$lib/config';

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.responseHeaders = new Map();

    let buffer = '';
    const response = await resolve(event, {
        transformPageChunk: ({ html, done }: any) => {

            buffer += html;
            if (done) {
                buffer = buffer.replace('<html lang="en">', `<html lang="${Config.lang}"/>`);
                return buffer;
            }
        }
    });

    event.locals.responseHeaders.forEach((value: string, key: string) => {
        response.headers.set(key, value);
    });

    return response;

}
