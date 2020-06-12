import moment from 'moment';
import validate from 'validate.js';
import {generateError, ERROR_CODE, ERROR_MESSAGE} from '@controller/errors';
import isEmpty from 'lodash/isEmpty';
import DeviceSchema from '@schemas/Device';
import UserSchema from '@schemas/User';

type Params = {
    username: string,
    deviceId: string,
    temperature?: string,
    humidity?: string,
    illumination?: string,
};

const CONSTRAINTS = {
    username: {
        presence: true,
        type: 'string',
        length: {
            minimum: 6,
        },
    },
    temperature: {
        presence: false,
        type: 'string',
    },
    humidity: {
        presence: false,
        type: 'string',
    },
    illumination: {
        presence: false,
        type: 'string',
    },
    deviceId: {
        presence: true,
        type: 'string',
    },
};

export default async (params: Params) => {
    const errors = validate(params, CONSTRAINTS, {format: 'detailed'});

    if (!isEmpty(errors)) {
        const message = {
            deviceError: ERROR_MESSAGE.UNKNOWN_ERROR,
        };
        return generateError(
            ERROR_CODE.UNKNOWN_ERROR,
            message,
        );
    }

    const {
        username,
        deviceId,
        temperature = '0',
        humidity = '0',
        illumination = '0',
    } = params;

    const user:any = await UserSchema.findOne({
        username,        
    });

    if (isEmpty(user)) {
        const message = {
            deviceError: ERROR_MESSAGE.UNKNOWN_ERROR,
        };
        return generateError(
            ERROR_CODE.UNKNOWN_ERROR,
            message
        );
    }

    // time stamp of new device data
    const timestamp = moment.utc().toISOString();


    return DeviceSchema.findOneAndUpdate({
        _id: deviceId,
        username: user._id,
    }, {
        $push: {
            temperature,
            humidity,
            illumination,
            valueTimeStamp: timestamp,
        },
    })
        .then(() => 'ok')
        .catch(() => '!ok');
};
