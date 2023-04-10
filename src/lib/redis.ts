import { default as redis } from 'redis';
import Config from '$lib/config';
const client = redis.createClient({ url: Config.redis });
client.connect();
export default client;
