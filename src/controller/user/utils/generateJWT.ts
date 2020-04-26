import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars
import {UserData} from './';

// config file
const ENV_NAME = process.env.NODE_ENV || 'development';
const config = require('@config/index.json')[ENV_NAME];

const generateJWT = (userData: UserData) =>
    jwt.sign({
        username: userData.username,
    },
    config.secret_phrase,
    {expiresIn: config.token_life_time});

export default generateJWT;
