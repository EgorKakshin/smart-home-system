import validate from 'validate.js';
import isEmpty from 'lodash/isEmpty';
import RoomSchema from '@schemas/Room';
import UserSchema from '@schemas/User';
import {generateError, ERROR_CODE, ERROR_MESSAGE} from '@controller/errors';

const CONSTRAINTS = {
    roomName: {
        presence: true,
        type: 'string',
        length: {
            minimum: 2,
        },
    },
    username: {
        presence: true,
        type: 'string',
        length: {
            minimum: 6,
        },
    },
};

type Params = {
    roomName: string,
    username: string,
};

export default async ({roomName, username}: Params) => {
    const errors = validate(
        {roomName, username},
        CONSTRAINTS,
        {format: 'detailed'}
    );

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

    const userRecord: any = await UserSchema.findOne({
        username
    });

    const roomRecord: any = await RoomSchema.findOne({
        name: roomName,
    });

    if (!isEmpty(roomRecord)) {
        const message = {
            roomError: ERROR_MESSAGE.ROOM_IS_EXIST,
        };
        return generateError(
            ERROR_CODE.ROOM_IS_EXIST,
            message,
        );
    }

    return new RoomSchema({
        name: roomName,
        username: userRecord._id,
    })
        .save()
        .then((roomRecord: any) => ({
            roomName: roomRecord.name,
        }))
        .catch(() => {
            const message = {
                roomError: ERROR_MESSAGE.ADD_NEW_ROOM_ERROR,
            };
            return generateError(
                ERROR_CODE.ADD_NEW_ROOM_ERROR,
                message,
            );
        });
};
