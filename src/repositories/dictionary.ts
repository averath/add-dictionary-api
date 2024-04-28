import _, { snakeCase } from 'lodash';
import BaseRepository from './base-repository';

class DictionaryRepository extends BaseRepository {
    /**
     * Finds a single dictionary based on provided criteria.
     * @param {string} value The value to search for.
     * @param {string} [column='id'] The column to search in. Defaults to 'id'.
     * @param {string} [pluck] Optional column to pluck from the result.
     * @returns The user record or null if not found, or an error object.
     */
    async findOne(value: string, column: string = 'id', pluck?: string) {
        try {
            let query = this.db('dictionaries').where(snakeCase(column), value);

            if (pluck) {
                query = query.select(pluck);
            }

            const dictionary = await query.first();

            if (!dictionary) return null;

            return dictionary;
        } catch (error) {
            console.log(error);
            if (error.code === 'ECONNREFUSED') {
                return {
                    message: 'ECONNREFUSED',
                    code: error.code,
                };
            }
            return {
                message: error.sqlMessage || error.message,
                code: error.code,
            };
        }
    }

    async create(data: object): Promise<unknown> {
        try {
            const [dictionaryId] = await this.db('dictionaries').insert({
                ...data,
            });

            return dictionaryId;
        } catch (error) {
            console.log(error);
            if (error.code === 'ECONNREFUSED') {
                return {
                    message: 'ECONNREFUSED',
                    code: error.code,
                };
            }
            return {
                message: error.sqlMessage || error.message,
                code: error.code,
            };
        }
    }
}

export default DictionaryRepository;
