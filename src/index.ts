import 'module-alias/register';
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
import cors from 'cors';

// config file
const ENV_NAME = process.env.NODE_ENV || 'development';
const config = require('@config/index.json')[ENV_NAME];
// routes
import {userRouter, deviceRouter, roomRouter} from '@routes/index';

const app = express();

/**
 * Макмимальный размер тела запроса
 * Limit body payload for request
 */
const REQUESTS_SIZE = '10kb';
/**
 * Количество запросов за RESET_TIME
 * Count of requests in RESET_TIME
 */
const MAX_REQUESTS = 5000;
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
app.use(cors());
//routes
app.use(limit);
app.use(userRouter);
app.use(deviceRouter);
app.use(roomRouter);

mongoose.set('useFindAndModify', false);
mongoose.connect(config.data_base_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(config.node_port, () => {
    // eslint-disable-next-line no-console
    console.log('Server start on PORT', config.node_port);
});
