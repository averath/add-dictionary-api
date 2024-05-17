import { MODE } from 'config/config';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import crypto from 'crypto';
import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import useragent from 'express-useragent';
import helmet from 'helmet';
import morgan from 'morgan';
import repositories from 'repositories/index';

import { v4 } from 'uuid';
import handleCorsError from './middlewares/handle-cors-error';
import dictionariesRoutes from './routes/dictionaries-routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const expressip = require('express-ip');

const maxQuerySize = '0.5mb';

declare global {
    namespace Express {
        interface Request {
            ctx: {
                // eslint-disable-next-line @typescript-eslint/ban-types
                repositories: {};
            };
        }
    }
}

const app = express();

const generateCsp = () => {
    // generate random nonce converted to base64. Must be different on every HTTP page load
    const hash = crypto.createHash('sha256');
    hash.update(v4());
    const nonce = hash.digest('base64');

    return nonce;
};

// middleware//

// Parse JSON bodies (as sent by API clients)
app.use(express.json({ limit: maxQuerySize }));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: maxQuerySize }));

app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware);
app.use(cookieParser());

if (MODE === 'production') {
    app.enable('trust proxy');
    app.use(
        rateLimit({
            windowMs: 10 * 60 * 1000, // 15 minutes
            max: 150, // limit each IP to 100 requests per windowMs
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
            message: {
                code: 'TOO_MANY_REQUESTS',
                message: 'Too many requests, please try again later.',
            },
        })
    );
    app.disable('x-powered-by');

    app.use(helmet());
    app.use(
        helmet.dnsPrefetchControl({
            allow: true,
        })
    );
    app.use(
        helmet.frameguard({
            action: 'deny',
        })
    );
    app.use(helmet.hidePoweredBy());
    app.use(
        helmet.hsts({
            maxAge: 31536000,
            includeSubDomains: false,
        })
    );
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(
        helmet.referrerPolicy({
            policy: ['origin', 'unsafe-url'],
        })
    );
    const nonce = generateCsp();

    app.use(
        helmet.contentSecurityPolicy({
            useDefaults: true,
            directives: {
                'font-src': ["'self'", "'unsafe-inline'"],
                'script-src': ["'self'", "'unsafe-eval'", `'nonce-${nonce}'`],
                'script-src-elem': [
                    "'self'",
                    `'nonce-${nonce}'`,
                    "'unsafe-eval'",
                ],
            },
        })
    );

    app.use(helmet.xssFilter());
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    // adding morgan to log HTTP requests
    app.use(morgan('common'));
}

/* Routes */
const globalRoutes = Router();

globalRoutes.get(['/api'], (req, res) => {
    return res.status(200).json({ text: 'API works fine' });
});
app.use('/api/public', express.static(`${__dirname}/public`));

const whitelist = ['https://readings.pl'];

const corsOptions: CorsOptions = {
    credentials: true,

    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    origin:
        MODE === 'production'
            ? function (origin, callback) {
                  if ((origin && whitelist.indexOf(origin) !== -1) || !origin) {
                      callback(null, true);
                  } else {
                      callback(new Error('Not allowed by CORS'));
                  }
              }
            : true,
};

app.use(cors(corsOptions));

app.use(handleCorsError);
app.use('/api', (req, res, next) => {
    req.ctx = { repositories };

    next();
});

app.use('*', (req, res, next) => {
    const query = req.query.query || req.body.query || '';
    if (query.length > 2000) {
        throw new Error('Query too large');
    }
    next();
});

//  Connect all our routes to our application
app.use('/', [globalRoutes, dictionariesRoutes]);

export default app;
