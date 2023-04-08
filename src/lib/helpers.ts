import { createHash } from 'crypto';
import Config from '$lib/config';

export function getImageURL(fromURL: string, width?: number, height?: number, fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' = 'contain', format: string = "webp"): string {

    let p = [];
    if (width && height) {
        p.push(`r:${width}x${height}`);
        p.push(`fit:${fit}`);
    }

    if (!p.length) {
        p = ['gnarly'];
    }

    const hash = createHash('md5').update(fromURL + p.join(';') + Config.secret).digest('hex');

    const fa = fromURL.split('?');

    return `${Config.url}/_image/${hash}/${p.join(';')}/${fa[0]}.${format}${fa[1] ? '?' + fa[1] : ''}`;
}
