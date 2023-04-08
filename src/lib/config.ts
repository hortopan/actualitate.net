import { env } from '$env/dynamic/private';

class CONFIG {
	public readonly secret: string;
	public readonly url: string;
	public readonly domain: string;
	public readonly friendly_url: string;
	public readonly friendly_name: string;
	public readonly friendly_description: string;
	public readonly lang: string;
	public readonly ghost_url: string;
	public readonly ghost_key: string;
	public readonly redirects_db_path?: string;

	public constructor() {

		if (!env.SECRET) {
			throw new Error('ENV SECRET missing');
		}

		this.secret = env.SECRET;

		if (!env.URL) {
			throw new Error('ENV URL missing');
		}

		this.url = env.URL;

		if (!env.DOMAIN) {
			throw new Error('ENV DOMAIN missing');
		}

		this.domain = env.DOMAIN;

		this.friendly_url = `https://${this.domain}`;

		if (!env.FRIENDLY_NAME) {
			throw new Error('ENV FRIENDLY_NAME missing');
		}

		this.friendly_name = env.FRIENDLY_NAME;

		if (!env.FRIENDLY_DESCRIPTION) {
			throw new Error('ENV FRIENDLY_DESCRIPTION missing');
		}

		this.friendly_description = env.FRIENDLY_DESCRIPTION;

		if (!env.LANG) {
			throw new Error('ENV LANG missing');
		}

		this.lang = env.LANG.toLowerCase();

		if (!env.GHOST_URL) {
			throw new Error('ENV GHOST_URL missing');
		}

		this.ghost_url = env.GHOST_URL;

		if (!env.GHOST_KEY) {
			throw new Error('ENV GHOST_KEY missing');
		}

		this.ghost_key = env.GHOST_KEY;

		if (env.REDIRECTS_DB_PATH) {
			this.redirects_db_path = env.REDIRECTS_DB_PATH;
		}

	}
}

export default new CONFIG();
