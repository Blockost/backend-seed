import UserService from '../userService';
import { injectable, inject } from 'inversify';
import User from '../../models/user';
import SERVICE_IDENTIFIERS from '../../config/inversify/serviceIdentifiers';
import LoggerService from '../loggerService';

@injectable()
export default class UserServiceImpl implements UserService {
  constructor(
    @inject(SERVICE_IDENTIFIERS.LoggerService) private readonly loggerService: LoggerService
  ) {}

  findById(id: number): Promise<User> {
    this.loggerService.info(`Reached findById/${id}`);
    return Promise.resolve(new User('firstname', 'lastname', 'username'));
  }
}
