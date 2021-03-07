import {ConnectionOptions} from 'typeorm';
import { config as dotenv } from 'dotenv';

dotenv();

// const CONNECTION_TIMEOUT = 2000;

const PGHOST = process.env.PGHOST || "http://127.0.0.1";
const PGPORT = process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432;
const PGUSER = process.env.DATABASE_USER || "";
const PGPW = process.env.DATABASE_PASSWORD || "";
const PGDB = process.env.APP_DB_NAME || ""

const db = (): ConnectionOptions => {
    return {
        type:'postgres',
        url: encodeURI(
            `postgresql://${PGUSER}:${PGPW}@${PGHOST}:${PGPORT}/${PGDB}`
        ),
        entities:['src/entities/*.ts'],
        migrations: ['src/migrations/**/*.ts,js'],
        synchronize: false,
        logging: false,
    };
};

export{ db };
