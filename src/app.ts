import express from 'express';
import 'dotenv/config';

//require('./passport');
//const auth = require('./routes/auth');
//const user = require('./routes/user');

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
//app.use('/auth', auth);
//app.use('/user', passport.authenticate('jwt', {session: false}), user);
