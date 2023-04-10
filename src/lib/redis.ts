import { default as redis } from 'redis';
import { env } from '$env/dynamic/private';
import Config from '$lib/config';
const client = redis.createClient({ url: Config.redis });

if (!env.BUILDING) {
    client.connect();
}

export default client;
