import { User } from '../../types';
import { Request, Response } from 'express';
import { UserModel } from '../../models/UserModel';
import { jwt } from '../../utils/jwt';
import { Redis } from '../../redis';
import bcrypt from 'bcrypt';
import { getRandomString } from '../../utils/getRandomString';
import { validate } from '../../helpers/validation/validate';
import { userSchema } from '../../helpers/validation/schemas/userSchema';

type Payload = Omit<User, 'id' | 'created_at' | 'updated_at' | 'role'>

export async function signUpController(req: Request, res: Response){
  const {email, password} : Payload = req.body;
  const validation = validate<Payload>(req.body, userSchema);

  if(!validation.isValid){
    return res.status(400).send(`Invalid ${validation.invalidKey}`);
  }

  try{
    const user = await UserModel.findOneBy({email});

    if(user){
      res.status(400).json({message: 'Invalid email or password'});
    }

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;
    const username = `${email.split('@')[0]}${getRandomString(5)}`

    const createdUser = await UserModel.create<Payload>({
      email,
      password: hashedPassword,
      username
    });

    const token = await jwt.sign({
      id: createdUser.id
    });

    await Redis.setSession(createdUser.id, token);

    res.status(200).json({token});
  } catch(error){
    return res.sendStatus(500);
  }
}