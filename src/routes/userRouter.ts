import { Router } from 'express';
import { updateUserController } from '../controllers/user/updateUserController';
import { deleteUserController } from '../controllers/user/deleteUserController';
import { logoutController } from '../controllers/user/logoutController';
import { updatePasswordController } from '../controllers/user/updatePasswordController';

export const userRouter = Router();

userRouter.patch('/', updateUserController);
userRouter.delete('/', deleteUserController);
userRouter.post('/logout', logoutController);
userRouter.post('/update-password', updatePasswordController);