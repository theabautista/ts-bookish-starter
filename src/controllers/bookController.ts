import { Router, Request, Response } from 'express';
import {Connection, Request as TediousRequest} from 'tedious';
import {passw} from '../../secretStuff'

class BookController {
    router: Router;
    config = {
        server: "HERMITCRAB",
        options: {
          port: 1433,
          database: 'bookish',
          trustServerCertificate: true,
          rowCollectionOnRequestCompletion: true,

        },
        authentication: {
          type: "default",
          options: {  
            userName: "Muhanad",
            password: passw,
          }
        }
      };
    

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.get('/', this.getBooks.bind(this));
        // this.router.post('/', this.createBook.bind(this));

    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getBooks = (req: Request, res: Response) => {
        let connection = new Connection(this.config);
        connection.on('connect', function(err) {
            if(err) {
                console.log('Error: ', err)
            }
            let request = new TediousRequest("select * from Books", function(err, _rowCount, rows) {
                if (err) {
                    console.log(err);
                } else {
                    let books = [];
                    for (let i = 0; i < rows.length; i++) {
                        books.push(new Book(rows[i][1].value, rows[i][0].value));
                    }
                    return res.status(200).json(books);
                }
            });
            connection.execSql(request);
        });
        connection.connect();
    }


    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

class Book {
    title = "";
    isbn = 0;

    constructor(title, isbn) {
        this.title = title;
        this.isbn = isbn;
    }
}

export default new BookController().router;
