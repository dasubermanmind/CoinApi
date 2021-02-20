
import {ConnectionOptions} from 'typeorm';
import { config as dotenv } from 'dotenv';

dotenv();

const CONNECTION_TIMEOUT = 2000;

const db = (): ConnectionOptions => {
    return {
        type:'postgres',
        url: 'http://localhost:',
        entities:['src/entities/**/*.ts'],
        migrations: ['src/migrations/*.ts,js'],
        synchronize: false,
        logging: false,
    };
};


export{ db};