import User from '../models/user';

export default interface UserService {
  /**
   * Finds the user with the given id.
   */
  findById(id: number): Promise<User>;
}
