import express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  request,
  response,
  BaseHttpController
} from 'inversify-express-utils';
import SERVICE_IDENTIFIERS from '../config/inversify/serviceIdentifiers';
import UserService from '../services/userService';

@controller('/user', SERVICE_IDENTIFIERS.HttpLoggerMiddleware)
export default class UserController extends BaseHttpController {
  constructor(@inject(SERVICE_IDENTIFIERS.UserService) private readonly userService: UserService) {
    super();
  }

  @httpGet('/:id')
  private async getUser(@request() req: express.Request, @response() res: express.Response) {
    const id = req.params.id;

    try {
      const user = await this.userService.findById(id);
      return this.json(user, 200);
    } catch (error) {
      return this.json(`An error occured while retrieving user ${id}`);
    }
  }
}
