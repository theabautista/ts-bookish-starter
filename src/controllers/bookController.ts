import { Router, Request, Response } from 'express';
import {Connection, Request as TediousRequest} from 'tedious';
import {passw} from '../../secretStuff'

class BookController {
    router: Router;
    config = {
        server: "SNAKE",
        options: {
          port: 1433,
          database: 'bookish',
          trustServerCertificate: true,
          rowCollectionOnRequestCompletion: true,

        },
        authentication: {
          type: "default",
          options: {  
            userName: "thebau",
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
            let request = new TediousRequest("select * from books", function(err, _rowCount, rows) {
                if (err) {
                    console.log(err);
                  } else {
                    console.log(rows)
                  }
            });
            // request.on('row', function(columns) {
            //     columns.forEach(function(column) {
            //       console.log(column.value);
            //     });
            // });
            connection.execSql(request);
          });

          connection.connect();
        
          return res.status(200).json({ status: 'OK' });
    }


    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

export default new BookController().router;
