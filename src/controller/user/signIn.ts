import argon2 from 'argon2';
import isEmpty from 'lodash/isEmpty';
import validate from 'validate.js';

import {ERROR_CODE, ERROR_MESSAGE, generateError} from '../errors';
import UserSchema from '@schemas/User';
import {generateJWT} from './utils';

const signInConstraints = {
    username: {
        presence: true,
        type: 'string',
        length: {
            minimum: 6,
        },
    },
    password: {
        presence: true,
        type: 'string',
        length: {
            minimum: 6,
        },
    },
};

interface Params {
    username: string,
    password: string,
}

export default async(params: Params) => {
    const errors = validate(params, signInConstraints, {format: 'detailed'});

    if (!isEmpty(errors)) {
        const message = errors.reduce((acc: any, error: any) => ({
            ...acc,
            [error.attribute]: error.error,
        }), {});
        return generateError(
            ERROR_CODE.VALIDATION_ERROR,
            message,
        );
    }

    const {username, password} = params;

    const userRecord: any = await UserSchema.findOne({username});

    if (!userRecord) {
        const message = {
            authUsername: ERROR_MESSAGE.USER_NOT_FOUND,
        };

        return generateError(
            ERROR_CODE.USER_NOT_FOUND,
            message,
        );
    }

    const isPasswordCorrect = await argon2.verify(userRecord.password, password);

    if (!isPasswordCorrect) {
        const message = {
            authPassword: ERROR_MESSAGE.INCORRECT_PASSWORD,
        };
        return generateError(
            ERROR_CODE.INCORRECT_PASSWORD,
            message,
        );
    }

    // в будущем надо возвращать токен
    return {
        token: generateJWT(userRecord),
        username: userRecord.username,
        isAuth: true,
    };
};
