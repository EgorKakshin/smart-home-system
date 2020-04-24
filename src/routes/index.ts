// eslint-disable-next-line no-unused-vars
import express, {Request, Response} from 'express';

const router = express.Router();

// обработчик
router.use((req, res, next) => {
    next();
});

router
    .route('/')
    .post(async (req: Request, res: Response) => {
        return res.send({
            object: true,
        });
    });

export default router;
