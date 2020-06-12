import validate from 'validate.js';
import isEmpty from 'lodash/isEmpty';

// eslint-disable-next-line no-unused-vars
import RoomSchema, {Room} from '@schemas/Room';
import UserSchema from '@schemas/User';
import DeviceSchema from '@schemas/Device';
import {generateError, ERROR_MESSAGE, ERROR_CODE} from '@controller/errors';

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
            roomError: ERROR_MESSAGE.UNKNOWN_ERROR,
        };
        return generateError(
            ERROR_CODE.UNKNOWN_ERROR,
            message,
        );
    }

    const userRecord: any = await UserSchema.findOne({username});

    const userRoomRecords: Array<any> = await RoomSchema.find({
        username: userRecord._id,
    });

    const DeviceCountPromise = await userRoomRecords.reduce(async (accPromise: any, room: any) => {
        const acc = await accPromise;
        return ([
            ...acc,
            {
                _id: room._id,
                name: room.name,
                deviceCount: await searchDeviceCount(room._id, userRecord._id),
            },
        ]);
    }, Promise.resolve([]));

    return Promise.resolve(DeviceCountPromise).then(rooms => ({
        result: rooms.map((room: any) => room._id),
        collection: rooms.reduce((acc: any, room: any) => ({
            ...acc,
            [room._id]: {
                id: room._id,
                name: room.name, 
                deviceCount: room.deviceCount,
            },
        }), {}),
    }));
};

const searchDeviceCount = async (roomId: string, userId: string): Promise<number> =>
    await DeviceSchema.countDocuments({
        username: userId,
        deviceRoom: roomId,
    });
