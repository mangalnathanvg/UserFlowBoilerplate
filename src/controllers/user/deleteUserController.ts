import { Request, Response } from 'express';
import { UserModel } from '../../models/UserModel';
import { Redis } from '../../redis';

export const deleteUserController = async (req: Request, res: Response) => {
  const user_id = req.user!.id;

  try {
    await Redis.deleteSession(user_id);
    await UserModel.delete(user_id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};