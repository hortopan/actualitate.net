import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import redis from '$lib/redis';

export const POST = (async ({ request, params }) => {

    // @ts-ignore
    const type = params.type;

    let body: any;

    try {
        body = await request.json();
    } catch (e) {
        throw error(400, "Invalid JSON on hooks");
    }

    switch (type) {
        case 'page_updated':
            await page_updated(body)
            break;

        case 'post_updated':
            await post_updated(body)
            break;

    }

    return json("ok");
}) satisfies RequestHandler;


async function page_updated(body: any) {

    console.log("page_updated", body.page.current.slug);

    if (body.page.current.slug === "config") {
        await redis.del('config');
    }

    await redis.hDel('page', body.page.current.slug);
}

async function post_updated(body: any) {
    console.log("post updated", body.post.current.slug);
    await redis.del('page');
    return json("ok");
}
