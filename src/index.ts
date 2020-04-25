import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
/**
 * Безопасность
 * Security
 * @see https://itnext.io/make-security-on-your-nodejs-api-the-priority-50da8dc71d68
 */ 
import rateLimit from 'express-rate-limit';
// @ts-ignore на данный момент нет @types/xss-clean => добавить декларацию d.ts
import xss from 'xss-clean';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// routes
import {userRouter} from './routes';

const app = express();

// Server constants
const PORT = 3000;
/**
 * Макмимальный размер тела запроса
 * Limit body payload for request
 */
const REQUESTS_SIZE = '10kb';
/**
 * Количество запросов за RESET_TIME
 * Count of requests in RESET_TIME
 */
const MAX_REQUESTS = 100;
/**
 * Промежуток, на который запросы проверяются
 * Timeframe for which requests are checked/remebered
 */
const RESET_TIME = 60 * 60 * 1000;

const limit = rateLimit({
    max: MAX_REQUESTS,
    windowMs: RESET_TIME,
    message: 'Too many requests',
});

app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express.json({
    limit: REQUESTS_SIZE,
}));
app.use(cookieParser());
app.use(xss());
app.use(mongoSanitize());
//routes
app.use(limit);
app.use(userRouter);

mongoose.connect('mongodb://localhost/smartServer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server start on PORT', PORT);
});
