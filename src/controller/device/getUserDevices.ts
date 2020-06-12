import validate from 'validate.js';
import isEmpty from 'lodash/isEmpty';

// eslint-disable-next-line no-unused-vars
import DeviceSchema, {Device} from '@schemas/Device';
import UserScheme from '@schemas/User';
import {generateError, ERROR_CODE, ERROR_MESSAGE} from '@controller/errors';

type Params = {
    username: string,
};

const CONSTRAINTS = {
    // по сути в куки лежит всегда правельный username
    username: {
        presence: true,
        type: 'string',
        length: {
            minimum: 6,
        },
    },
};

export default async ({username}: Params) => {
    const errors = validate({username}, CONSTRAINTS, {format: 'detailed'});

    if (!isEmpty(errors)) {
        const message = {
            deviceError: ERROR_MESSAGE.UNKNOWN_ERROR,
        };
        return generateError(
            ERROR_CODE.UNKNOWN_ERROR,
            message,
        );
    }

    const userRecord: any = await UserScheme.findOne({username});

    const userDevicesRecord: any = await DeviceSchema.find({
        username: userRecord._id,
    }).populate({
        path: 'deviceRoom',
        select: 'name',
    });

    return {
        result: userDevicesRecord.map((device: any) => device._id),
        collection: userDevicesRecord.reduce((acc: any, device: Device) => ({
            ...acc,
            [device._id]: {
                id: device._id,
                deviceName: device.deviceName,
                deviceRoom: device.deviceRoom.name,
                icon: device.icon,
                // костыль! icon === тип устройства
                [device.icon]: device[device.icon],
                dataTimeStamp: device.valueTimeStamp,
            },
        }), {}),
    };
};
