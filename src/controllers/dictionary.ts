import DictionaryService from 'App/services/dictionary-service';
import { NextFunction, Request, Response } from 'express';
import { Details } from 'express-useragent';

class Dictionary {
    static async add(req: Request, res: Response, next: NextFunction) {
        try {
            const input = req.body;

            const {
                isMobile,
                browser,
                platform,
                os: OS,
            } = req?.useragent as Details;
            const reqInfo = {
                ip_address:
                    req.headers['cf-connecting-ip'] ||
                    req.headers['x-forwarded-for'] ||
                    req.socket.remoteAddress ||
                    null,
                mobile: isMobile,
                browser,
                platform,
                OS,
            };
            const response = await DictionaryService.add(input, reqInfo);
            if (
                (response as { errors: unknown[] }).errors &&
                (response as { errors: unknown[] }).errors.length
            )
                return res
                    .status(400)
                    .json((response as { errors: unknown[] }).errors);

            return res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
            return next(error);
        }
    }
}

export default Dictionary;
