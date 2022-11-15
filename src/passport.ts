import { dbRequest, getUserList } from './helper';
const passport = require('passport');
import { config } from './controllers/bookController';
import { Connection, Request } from 'tedious';

import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email, password, cb) {
            return verifyEmailPassword(email, password)
                .then((user) => {
                    if (!user) {
                        return cb(null, false, {
                            message: 'Incorrect email or password.',
                        });
                    }
                    return cb(null, user, {
                        message: 'Logged In Successfully',
                    });
                })
                .catch((err) => cb(err));
        },
    ),
);

function verifyEmailPassword(email, password) {
    return new Promise((resolve, reject) => {
        const connection = new Connection(config);
        connection.connect((err) => {
            if (err) {
                console.log('Connection Failed');
                throw err;
            }

            const request = new Request(
                `select * from Users WHERE email = '${email}' AND password = '${password}'`,
                function (err) {
                    if (err) {
                        throw err;
                    }
                },
            );

            connection.execSql(request);
            request.on('row', function (columns) {
                resolve(columns[0].value);
            });

            request.on('doneProc', function () {
                resolve(null);
            });
        });
    });
}

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey   : 'your_jwt_secret'
//     },
//     function (jwtPayload, cb) {
//
//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         return UserModel.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your_jwt_secret',
        },
        function (jwtPayload, cb) {
            return cb(null, jwtPayload);
        },
    ),
);
