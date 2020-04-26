import argon2 from 'argon2';
import isEmpty from 'lodash/isEmpty';
import validate from 'validate.js';

import {ERROR_CODE, ERROR_MESSAGE, generateError} from '../errors';
import UserSchema from '@schemas/User';
import {generateJWT} from './utils';

const signUpConstraints = {
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
    controlQuestion: {
        presence: true,
        type: 'string',
    },
    controlQuestionResponse: {
        presence: true,
        type: 'string',
    },
};

interface Params {
    username: string,
    password: string,
    controlQuestion: string,
    controlQuestionResponse: string,
}

export default async (params: Params) => {
    const errors = validate(params, signUpConstraints, {format: 'flat'});

    if (!isEmpty(errors)) {
        return generateError(
            ERROR_CODE.VALIDATION_ERROR,
            errors.join('; ')
        );
    }

    const {
        username,
        password,
        controlQuestion,
        controlQuestionResponse,
    } = params;

    const isUserCreate = await UserSchema.findOne({username});

    if (isUserCreate) {
        return generateError(
            ERROR_CODE.USER_IS_EXIST,
            ERROR_MESSAGE.USER_IS_EXIST,
        );
    }

    const passwordHashed = await argon2.hash(password);

    return new UserSchema({
        password: passwordHashed,
        username,
        controlQuestion,
        controlQuestionResponse,
    })
        .save()
        .then((userRecord: any) => ({
            user: {
                username: userRecord.username,
            },
            token: generateJWT(userRecord),
        }))
        // @TODO add logger
        .catch(() => generateError(
            ERROR_CODE.CREATE_NEW_USER_ERROR,
            ERROR_MESSAGE.CREATE_NEW_USER_ERROR,
        ));
};
