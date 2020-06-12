// eslint-disable-next-line no-unused-vars
import express, {Request, Response} from 'express';

import {checkJWT} from '@controller/user/utils';
import {
    addNewDevice,
    getUserDevices,
    updateDeviceData,
} from '@controller/device';

const router = express.Router();

router.use((req: Request, res: Response, next) => {
    next();
});

router
    .route('/addNewDevice')
    .post(checkJWT, async (request: Request, response: Response) => {
        const CreateNewDevice = await addNewDevice(request.body);
        return response.send(CreateNewDevice);
    });

router
    .route('/getDeviceList')
    .get(checkJWT, async (request: Request, response: Response) => {
        const DeviceList = await getUserDevices(request.body);
        return response.send(DeviceList);
    });

router
    .route('/updateDeviceData')
    .post(checkJWT, async (request: Request, response: Response) => {
        const updateDataStatus = await updateDeviceData(request.body);
        if (updateDataStatus === 'ok') {
            return response.sendStatus(200);
        }

        return response.sendStatus(400);
    });

export default router;
