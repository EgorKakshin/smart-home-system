// eslint-disable-next-line no-unused-vars
import express, {Request, Response} from 'express';
import {signIn, signUp} from '../../controller/user';

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

export default router;
