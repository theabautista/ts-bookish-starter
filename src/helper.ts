import { config } from './controllers/bookController';
import { Connection, Request as TediousRequest } from 'tedious';

export function dbRequest(table, dbfunction) {
    const connection = new Connection(config);
    connection.on('connect', function (err) {
        if (err) {
            console.log('Error: ', err);
        }
        const request = new TediousRequest('select * from ' + table, function (
            err,
            _rowCount,
            rows,
        ) {
            if (err) {
                console.log(err);
            } else {
                return dbfunction(rows);
            }
        });
        connection.execSql(request);
    });
    connection.connect();
}

type User = {
    Username: string;
    Password: string;
};

export function getUserList(rows) {
    const users = [];
    for (let i = 0; i < rows.length; i++) {
        const user: User = { Username: rows[i][3], Password: rows[i][4] };
        users.push(user);
    }
    return users;
}
