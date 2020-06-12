// eslint-disable-next-line no-unused-vars
import express, {Request, Response} from 'express';

import {checkJWT} from '@controller/user/utils';
import {addNewRoom, getUserRoomList} from '@controller/room';

const router = express.Router();

// обработчик каждого запроса
router.use((request: Request, response: Response, next) => {
    next();
});

router
    .route('/addNewRoom')
    .post(checkJWT, async (request: Request, response: Response) => {
        const CreateNewRoom = await addNewRoom(request.body);
        return response.send(CreateNewRoom);
    });

router
    .route('/getRoomList')
    .get(checkJWT, async (request: Request, response: Response) => {
        const RoomList = await getUserRoomList(request.body);
        return response.send(RoomList);
    });

export default router;
