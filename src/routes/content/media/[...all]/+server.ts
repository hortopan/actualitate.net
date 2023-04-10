import type { RequestHandler } from './$types';
import { error, redirect } from '@sveltejs/kit';
import Config from '$lib/config';
export const GET = (async (url) => {
    throw redirect(302, Config.ghost_public_url + url.url.pathname);
}) satisfies RequestHandler;
