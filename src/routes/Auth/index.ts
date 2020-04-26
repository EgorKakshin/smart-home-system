// eslint-disable-next-line no-unused-vars
import express, {Request, Response, request} from 'express';
import {signIn, signUp} from '@controller/user';
import {checkJWT} from '@controller/user/utils';

const router = express.Router();

// обработчик каждого запроса
router.use((req: Request, res: Response, next) => {
    next();
});

// Регистрация
router
    .route('/signUp')
    .post(async (request: Request, response: Response) => {
        const UserSignUpStatus = await signUp(request.body);
        return response.send(UserSignUpStatus);
    });
// Авторизация
router
    .route('/signIn')
    .post(async (request: Request, response: Response) => {
        const UserSignInStatus = await signIn(request.body);
        return response.send(UserSignInStatus);
    });

router
    .route('/test')
    .get(checkJWT, async (request: Request, response: Response) => {
        response.send({okey: true});
    });

export default router;
