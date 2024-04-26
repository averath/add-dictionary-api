import 'reflect-metadata';

import { PORT } from 'config/config';
import app from './server';

const main = async () => {
    const port = PORT || 3000;
    try {
        app.listen(port, () => {
            console.log(`Now listening on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};
main();
