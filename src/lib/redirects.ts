import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Config from '$lib/config';

let db: any;

let first_time = true;

export default async function getRedirect(path: string): Promise<string | void> {

    if (!db) {

        if (!Config.redirects_db_path) {
            if (first_time) {
                console.log('No redirects database path set');
            }

            first_time = false;

            return;
        }

        db = await open({
            filename: Config.redirects_db_path,
            driver: sqlite3.Database,
        });

    };

    const old_article = path.match(/(\d{1,})\.html$/ig)?.[0].split('.')[0];

    if (old_article) {
        const redirect = await db.get('SELECT * FROM redirects WHERE source_path LIKE ?', `%-${old_article}.html`);
        return redirect?.destination_path;
    }

    const redirect = await db.get('SELECT * FROM redirects WHERE source_path = ?', path);
    return redirect?.destination_path;
}
