import 'reflect-metadata';
import { Container } from 'inversify';
import SERVICE_IDENTIFIERS from './serviceIdentifiers';
import UserServiceImpl from '../../services/impl/userServiceImpl';
import UserService from '../../services/userService';
import HttpLoggerMiddlewareImpl from '../../middlewares/impl/httpLoggerMiddlewareImpl';
import HttpLoggerMiddleware from '../../middlewares/httpLoggerMiddleware';

/**
 * Class that holds the configuration of the Inversify container.
 *
 * This should be the only place in the application where there is some coupling.
 */
export default class InversifyConfig {
  private container: Container;

  constructor() {
    // XXX: 2019-03-11 Blockost Make all dependecies singletons
    this.container = new Container({ defaultScope: 'Singleton' });
  }

  getContainer() {
    return this.container;
  }

  /**
   * Defines binding between abstraction to concrete classes.
   */
  bind() {
    this.container.bind<UserService>(SERVICE_IDENTIFIERS.UserService).to(UserServiceImpl);
    this.container
      .bind<HttpLoggerMiddleware>(SERVICE_IDENTIFIERS.HttpLoggerMiddleware)
      .to(HttpLoggerMiddlewareImpl);
  }

  /**
   * Defines binding between abstraction to concrete classes that need to be
   * aynchronously instantiated.
   */
  bindAsync(): Promise<void> {
    return Promise.resolve();
  }
}
