import { Router } from 'express';
import { authRouter } from './authRouter';
import { healthController } from '../controllers/healthController';
import { sessionController } from '../controllers/sessionController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userRouter } from './userRouter';

export const router = Router({mergeParams: true})

router.get('/health', healthController);
router.use('/auth', authRouter);
router.get('/session', authMiddleware, sessionController);
router.use('/user', authMiddleware, userRouter)

router.use((_, res) => {
  return res.status(404).json({message: 'Not Found'});
})