import { Model } from '../models/Model';

import {Role, User, DefaultUserData} from '../types';

export class UserModel extends Model{
  static tableName = "users";

  public static async create<Payload>(data: Payload){
    return super.insert<Payload & DefaultUserData>({
      ...data,
      role: (data as Partial<DefaultUserData>).role || Role.Blogger
    })
  }

  public static findByEmail(email: string): Promise<User | null> {
    return this.findOneBy<
      {
        email: string;
      },
      User
    >({ email });
  }

  public static findByUsername(username: string): Promise<User | null> {
    return this.findOneBy<
      {
        username: string;
      },
      User
    >({ username });
  }
}