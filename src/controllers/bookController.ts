import { Router, Request, Response } from 'express';
import {Connection, Request as TediousRequest} from 'tedious';
import {passw} from '../../secretStuff'
import {dbRequest} from "../helper";


export let config = {
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

class BookController {
    router: Router;
    

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
        function getBookList(rows) {
            let books = [];
            for (let i = 0; i < rows.length; i++) {
                books.push(new Book(rows[i][1].value, rows[i][0].value));
            }
            console.log(books[0].findOne({"title":"Shantaram","isbn":"1234567890"}));
            return res.status(200).json(books);
        }

        dbRequest("Books", getBookList);
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
