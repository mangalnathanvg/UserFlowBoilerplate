import { Router } from 'express';
import { signUpController } from '../controllers/auth/signUpController';
import { loginController } from '../controllers/auth/loginController';

export const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/login', loginController);