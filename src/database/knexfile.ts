import {
    DEV_DB_HOST,
    DEV_DB_NAME,
    DEV_DB_PASSWORD,
    DEV_DB_PORT,
    DEV_DB_USER,
    PROD_DB_HOST,
    PROD_DB_NAME,
    PROD_DB_PASSWORD,
    PROD_DB_PORT,
    PROD_DB_USER,
} from 'config/config';

const configs = {
    production: {
        client: 'mysql2',
        connection: {
            ssl: {
                rejectUnauthorized: false,
            },
            database: PROD_DB_NAME,
            host: PROD_DB_HOST,
            user: PROD_DB_USER,
            password: PROD_DB_PASSWORD,
            port: PROD_DB_PORT as unknown as number,
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
    development: {
        client: 'mysql2',
        connection: {
            database: DEV_DB_NAME,
            host: DEV_DB_HOST,
            user: DEV_DB_USER,
            password: DEV_DB_PASSWORD as unknown as string,
            port: DEV_DB_PORT as unknown as number,
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
};

export default configs;
