import validate from 'validate.js';
import DeviceSchema from '@schemas/Device';
import UserSchema from '@schemas/User';
import RoomSchema from '@schemas/Room';
import isEmpty from 'lodash/isEmpty';
import {generateError, ERROR_CODE, ERROR_MESSAGE} from '@controller/errors';

const newDeviceConstraints = {
    deviceName: {
        presence: true,
        type: 'string',
        length: {
            minimum: 2,
        },
    },
    deviceRoom: {
        presence: true,
        type: 'string',
        length: {
            minimum: 3,
        },
    },
    icon: {
        presence: true,
        type: 'string',
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
    deviceName: string,
    deviceRoom: string,
    icon: string,
    username: string,
};

export default async({deviceName, deviceRoom = 'NO ROOM', icon, username}: Params) => {
    const errors = validate(
        {deviceName, deviceRoom, icon, username},
        newDeviceConstraints,
        {format: 'detailed'});

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
        username,
    });

    const roomRecord: any = await RoomSchema.findOne({
        name: deviceRoom,
    });

    if (isEmpty(userRecord)) {
        const message = {
            authUsername: ERROR_MESSAGE.USER_NOT_FOUND,
        };

        return generateError(
            ERROR_CODE.USER_NOT_FOUND,
            message,
        );
    }

    if (isEmpty(roomRecord)) {
        const message = {
            deviceError: ERROR_MESSAGE.ROOM_NOT_FOUND,
        };
        return generateError(
            ERROR_CODE.ROOM_NOT_FOUND,
            message
        );
    }

    return new DeviceSchema({
        deviceName,
        deviceRoom: roomRecord._id,
        icon,
        username: userRecord._id,
    })
        .save()
        .then((deviceRecord: any) => ({
            deviceName: deviceRecord.deviceName,
            deviceRoom: deviceRecord.deviceRoom,
            icon: deviceRecord.icon,
        }))
        .catch(() => {
            const message = {
                addNewDevice: ERROR_MESSAGE.ADD_NEW_DEVICE_ERROR,
            };
            return generateError(
                ERROR_CODE.ADD_NEW_DEVICE_ERROR,
                message,
            );
        });
};
