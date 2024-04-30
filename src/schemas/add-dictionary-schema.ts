import Joi, { ObjectSchema } from 'joi';

const requiredMessage = 'This field is required.';
export const allowedTargetLanguages = [
    'German',
    'Polish',
    'French',
    'Italian',
    'Spanish',
];
export const allowedSourceLanguages = ['English'];
let schema: Record<string, Joi.AnySchema> = {
    emailAddress: Joi.string().email().trim().required().messages({
        'string.email': 'Invalid email address',
        'any.required': requiredMessage,
        'string.empty': requiredMessage,
    }),

    content: Joi.string().trim().required().messages({
        'string.base': 'Invalid content',
        'any.required': requiredMessage,
        'string.empty': requiredMessage,
    }),
    code: Joi.string().trim().messages({
        'string.base': 'Invalid code',
        'any.required': requiredMessage,
        'string.empty': requiredMessage,
    }),
    sourceLanguage: Joi.string()
        .valid(...allowedSourceLanguages)
        .required()
        .messages({
            'any.only': 'Invalid language',
            'any.required': requiredMessage,
            'string.empty': requiredMessage,
        }),
    targetLanguage: Joi.string()
        .valid(...allowedTargetLanguages)
        .required()
        .messages({
            'any.only': 'Invalid language',
            'any.required': requiredMessage,
            'string.empty': requiredMessage,
        }),

    terms: Joi.boolean().invalid(false).required().messages({
        'boolean.base': 'Invalid format',
        'any.invalid': 'Terms and conditions must be accepted.',
        'any.required': requiredMessage,
    }),
};

if (process.env.NODE_ENV === 'production') {
    schema.recaptchaToken = Joi.string().required().messages({
        'string.base': 'Invalid ReCaptcha token',
        'any.required': requiredMessage,
        'string.empty': requiredMessage,
    });
}

const addDictionarySchema: ObjectSchema = Joi.object().keys(schema);

export default addDictionarySchema;
