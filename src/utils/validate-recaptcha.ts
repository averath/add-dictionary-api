import axios from 'axios';
import { RECAPTCHA_SECRET_BACKEND } from 'config/config';
import { errorsType } from 'types/errors-type';

// Defines the response type for reCAPTCHA validation
type recaptchaValidationResponseType = {
    success?: true;
    errors?: errorsType[];
};

/**
 * Validates the reCAPTCHA token.
 *
 * @param token The reCAPTCHA token submitted by the client.
 * @returns An object containing either the success flag or errors.
 */
const validateRecaptcha = async (
    token: string
): Promise<recaptchaValidationResponseType> => {
    try {
        const errors: errorsType[] = [];
        const recaptchaSecret = RECAPTCHA_SECRET_BACKEND;

        // Checks if the token was provided
        if (!token) {
            errors.push({
                code: 'recaptcha',
                message: 'Recaptcha not provided',
            });
            return { errors };
        }

        // Makes a request to Google's reCAPTCHA API to verify the token
        const recaptchaValidationResponse = await axios(
            `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`
        );

        // Checks if the validation was successful
        if (!recaptchaValidationResponse.data.success) {
            errors.push({
                code: 'recaptcha',
                message: 'Recaptcha validation failed',
            });
            return { errors };
        }

        // Returns success if the validation passed successfully
        return { success: true };
    } catch (error) {
        console.error(error);
        return { errors: [{ code: 'recaptcha', message: 'Unknown Error' }] };
    }
};

export default validateRecaptcha;
