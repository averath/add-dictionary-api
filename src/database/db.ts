import { MODE } from 'config/config';
import * as dotenv from 'dotenv';
import knex,{Knex} from 'knex';
import path from 'path';
import configs from './knexfile';

const envPath = path.join(__dirname, './../../../.env');

dotenv.config({ path: envPath });


const config: Knex.Config = configs[MODE as keyof typeof configs] || configs.development;

const db = knex(config);

export default db;
