import express from 'express';
import 'dotenv/config';

import { config } from './controllers/bookController';
import { Connection, Request } from 'tedious';
// const auth = require('./routes/auth');
//const user = require('./routes/user');

const passport = require('passport');
require('./passport');
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
// app.use('/auth', auth);
//app.use('/user', passport.authenticate('jwt', {session: false}), user);
const connection = new Connection(config);

app.get(
    '/test',
    passport.authenticate('jwt', { session: false }),
    function (req, res) {
        connection.connect((err) => {
            if (err) {
                console.log('Connection Failed');
                throw err;
            }
            executeStatement();
        });

        function executeStatement() {
            const request = new Request('select * from Books', function (err) {
                if (err) {
                    throw err;
                }
            });

            connection.execSql(request);

            request.on('row', function (columns) {
                columns.forEach(function (column) {
                    console.log(column);
                });
            });
        }
    },
);

export class Book {
    isbn: number;
    title: string;

    constructor(isbn: number, title: string) {
        this.isbn = isbn;
        this.title = title;
    }
}
