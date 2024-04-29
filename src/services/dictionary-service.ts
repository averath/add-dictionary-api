import { MODE } from 'App/config/config';
import db from 'App/database/db';
import DictionaryRepository from 'App/repositories/dictionary';
import addDictionarySchema from 'App/schemas/add-dictionary-schema';
import { errorsType, validationErrorType } from 'App/types/errors-type';
import { ReqInfoType } from 'App/types/req-info-type';
import validateRecaptcha from 'App/utils/validate-recaptcha';
import { Context, ValidationError } from 'joi';

type AddDictionaryType = {
    email: string;
    content: string;
    terms: boolean | string;
    code?: string;
    recaptchaToken?: string;
};

class DictionaryService {
    static async add(
        data: AddDictionaryType,
        reqInfo: ReqInfoType
    ): Promise<unknown> {
        try {
            const errors: errorsType[] = [];
            const dictionaryRepository = new DictionaryRepository(db);
            const { recaptchaToken, terms, content, code, ...rest } = data;
            const isRecaptchaValid =
                MODE === 'production'
                    ? await validateRecaptcha(recaptchaToken ?? '')
                    : undefined;

            if (!isRecaptchaValid?.success && MODE === 'production')
                return { errors: isRecaptchaValid?.errors };

            const _validationResponse = await addDictionarySchema.validateAsync(
                data,
                {
                    abortEarly: false,
                }
            );

            const dataToSave = {
                ...rest,
                txtDocument: content,
                ip: reqInfo.ip_address,
            };

            const dictionaryCreationResponse =
                await dictionaryRepository.create(dataToSave);

            if (typeof dictionaryCreationResponse !== 'number')
                errors.push({
                    ...(dictionaryCreationResponse as errorsType),
                });
            if (errors && errors.length) return { errors };

            return true;
        } catch (errorsData) {
            if (errorsData instanceof ValidationError) {
                const errors: validationErrorType[] = [];
                errorsData.details?.map((error: Context) => {
                    errors.push({
                        code: error.context.label,
                        message: error.message,
                        type: error.type,
                    });
                });

                return { errors: errors };
            }
            return errorsData;
        }
    }
}

export default DictionaryService;
