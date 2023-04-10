import type { RequestHandler } from './$types';
import axios, { Axios } from 'axios';
import sharp from 'sharp';
import { createHash } from 'crypto';
import { error } from '@sveltejs/kit';
import Config from '$lib/config';

export const GET = (async (url) => {

    const pa = url.url.pathname.split('/');

    const received_hash = pa[2];
    const transforms = pa[3].split(';');

    let remoteImage = pa.slice(4).join('/');
    const ra = remoteImage.split('.');
    ra.pop();
    remoteImage = ra.join('.') + (url.url.search || '');

    const hash = createHash('md5').update(remoteImage + transforms.join(';') + Config.secret).digest('hex');

    if (received_hash !== hash) {
        throw error(409, 'Invalid hash');
    }

    let req: any;

    try {
        req = await axios.request({
            url: remoteImage,
            maxRedirects: 1,
            maxBodyLength: 1024 * 1024 * 10,
            maxContentLength: 1024 * 1024 * 10,
            timeout: 10000,
            method: 'GET',
            responseType: 'arraybuffer',
            validateStatus: (_status) => true,
        });
    } catch (e: any) {
        throw error(409, e.toString());
    }

    if (req.status !== 200) {
        throw error(409, req.statusText);
    }

    if (!req.headers['content-type'].startsWith('image/')) {
        throw error(409);
    }

    const image = sharp(req.data, { animated: false });

    image.timeout({
        seconds: 3,
    });

    const metadata = await image.metadata();

    if (!metadata.size || metadata.size > 1024 * 1024 * 25) {
        throw error(409);
    }

    image.rotate();
    image.flatten({ background: '#fff' });

    let quality = 80;
    let fit = 'inside';
    let width = 1200;
    let height = 1200;

    for (const transform of transforms) {
        const t = transform.split(':');
        switch (t[0]) {
            case 'r':
                const parameters = t[1].split(',');

                const [w, h] = parameters[0].split('x').map(Number);
                if (w && h) {
                    width = w;
                    height = h;
                }

                break;

            case 'fit':
                fit = t[1];
                break;

            case 'q':
                quality = Number(t[1]);
                break;
        }

    }

    image.resize(width, height, {
        fit: fit as any,
        position: sharp.strategy.attention,
    });


    image.webp({
        quality,
    });

    const buffer = await image.toBuffer();
    const response = new Response(buffer);
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Content-Type', 'image/webp');
    return response;
}) satisfies RequestHandler;
