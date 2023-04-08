import type { RequestHandler } from './$types';

export const GET = (async (url) => {
    const response = new Response('ok');
    return response;
}) satisfies RequestHandler;
