import {Request, Response} from 'express';
import { UserModel } from '../models/UserModel';
import type {User} from '../types';
import { Redis } from '../redis';

export const sessionController = async (req: Request, res: Response) => {
  if(!req.user) return res.sendStatus(401)

  try
  {
    const cachedProfile = await Redis.getSession(req.user.id);

    if(cachedProfile){
      return res.status(200).json(cachedProfile);
    }else {
      const user = await UserModel.findOneById<User>(req.user.id);

      if (user) {
        await Redis.setSession(req.user.id, JSON.stringify(user))
        return res.status(201).json(user);
      } else {
        return res.sendStatus(401);
      }
    }
  } catch(error){
    return res.sendStatus(500);
  }
}