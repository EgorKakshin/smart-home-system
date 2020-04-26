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
    const errors = validate(params, signInConstraints, {format: 'flat'});

    if (!isEmpty(errors)) {
        return generateError(
            ERROR_CODE.VALIDATION_ERROR,
            errors.join('; ')
        );
    }

    const {username, password} = params;

    const userRecord: any = await UserSchema.findOne({username});

    if (!userRecord) {
        return generateError(
            ERROR_CODE.USER_NOT_FOUND,
            ERROR_MESSAGE.USER_NOT_FOUND,
        );
    }

    const isPasswordCorrect = await argon2.verify(userRecord.password, password);

    if (!isPasswordCorrect) {
        return generateError(
            ERROR_CODE.INCORRECT_PASSWORD,
            ERROR_MESSAGE.INCORRECT_PASSWORD,
        );
    }

    // в будущем надо возвращать токен
    return {
        user: {
            username: userRecord.username,
        },
        token: generateJWT(userRecord),
    };
};
