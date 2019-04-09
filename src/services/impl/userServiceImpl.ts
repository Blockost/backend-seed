import UserService from '../userService';
import { injectable } from 'inversify';
import User from '../../models/user';

@injectable()
export default class UserServiceImpl implements UserService {
  findById(id: number): Promise<User> {
    return Promise.resolve(new User('firstname', 'lastname', 'username'));
  }
}
