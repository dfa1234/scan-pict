import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import {serverConf} from './config';
import {HttpStatus} from "./http-status";
import bodyParser = require('body-parser');
import {postPicture} from "./services/upload";

const logger = require('morgan');
const sslRootCas = require('ssl-root-cas');
const cookieParser = require('cookie-parser');


// SERVER CONFIGURATION
const app = express();
app.use(bodyParser.json({ limit: '6mb' }));
app.use(cookieParser());
app.use(logger('[:date[clf]] - :remote-addr - :method - :url - :status - :response-time ms'));
app.use((req: Request, res: Response, next: NextFunction) => {
    let origin:any =  req.get('origin') || '*';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers',
        'X-Requested-With, ' +
        'X-HTTP-Method-Override, ' +
        'Content-Type, ' +
        'Accept,' +
        'Access-Control-Allow-Credentials,' +
        'Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(HttpStatus.OK);
    } else {
        next();
    }
});

// ROUTES
app.get('/', (req, res, next) => res.send('👍'));

app.post('/upload', postPicture);
app.use('/images', express.static('images'));

app.get('*', (req, res, next) => res.send('👎'));


// START
http.createServer(app).setTimeout(10000).listen(serverConf.port, () => {
    console.log('server started');
});
if (fs.existsSync('./tls/privkey.pem') && fs.existsSync('./tls/fullchain.pem')) {
    sslRootCas.inject();
    https.createServer({
        cert: fs.readFileSync('./tls/fullchain.pem'),
        key: fs.readFileSync('./tls/privkey.pem')
    }, app).setTimeout(10000).listen(serverConf.portSSL, () => {
        console.log('server ssl started');
    });
}
