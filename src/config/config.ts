/* eslint-disable prefer-destructuring */
/* eslint-disable spaced-comment */
import * as dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

dotenv.config({ path: envPath });

export const PORT = process.env.PORT;
export const MODE = process.env.ENV;

//PRODUCTION

export const PROD_DB_HOST = process.env.PROD_DB_HOST;
export const PROD_DB_PORT = process.env.PROD_DB_PORT;
export const PROD_DB_NAME = process.env.PROD_DB_NAME;
export const PROD_DB_TABLE = process.env.PROD_DB_TABLE;
export const PROD_DB_PASSWORD = process.env.PROD_DB_PASSWORD;
export const PROD_DB_USER = process.env.PROD_DB_USER;

//DEVELOPMENT

export const DEV_DB_HOST = process.env.DEV_DB_HOST;
export const DEV_DB_PORT = process.env.DEV_DB_PORT;
export const DEV_DB_NAME = process.env.DEV_DB_NAME;
export const DEV_DB_TABLE = process.env.DEV_DB_TABLE;
export const DEV_DB_PASSWORD = process.env.DEV_DB_PASSWORD;
export const DEV_DB_USER = process.env.DEV_DB_USER;
