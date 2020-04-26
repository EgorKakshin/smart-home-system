import jwt from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import {Request, Response, NextFunction} from 'express';
import {generateJWT} from './';

// config file
const ENV_NAME = process.env.NODE_ENV || 'development';
const config = require('@config/index.json')[ENV_NAME];

import {getUserAuthToken} from '@getters/user';

const checkJWT = (request: Request, response: Response, next: NextFunction) => {
    const authToken = getUserAuthToken(request);
    if (!authToken) {
        return response.sendStatus(403);
    }

    let decodeToken;
    
    try {
        decodeToken = <any>jwt.verify(authToken, config.secret_phrase);
    } catch (error) {
        return response.sendStatus(403);
    }

    const {username} = decodeToken;

    response.setHeader('authorization', generateJWT({username}));
    request.body.username = username;
    next();
};

export default checkJWT;
