// eslint-disable-next-line no-unused-vars
import {Request} from 'express';

export const getUserAuthToken = (request: Request): string | undefined =>
    request.headers.authorization;
