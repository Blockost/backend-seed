import 'reflect-metadata';
import { Container } from 'inversify';
import { createConnection, Connection } from 'typeorm';
import SERVICE_IDENTIFIERS from './serviceIdentifiers';
import UserServiceImpl from '../../services/impl/userServiceImpl';
import UserService from '../../services/userService';
import HttpLoggerMiddlewareImpl from '../../middlewares/impl/httpLoggerMiddlewareImpl';
import HttpLoggerMiddleware from '../../middlewares/httpLoggerMiddleware';
import LoggerServiceImpl from '../../services/impl/loggerServiceImpl';
import LoggerService from '../../services/loggerService';
import ConfigService from '../configService';

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
    this.container.bind<LoggerService>(SERVICE_IDENTIFIERS.LoggerService).to(LoggerServiceImpl);
    this.container.bind(ConfigService).toSelf();
  }

  /**
   * Defines binding between abstraction to concrete classes that need to be
   * aynchronously instantiated.
   */
  async bindAsync(): Promise<any> {
    const ormConfig = this.container.get(ConfigService).getOrmConfig();
    const typeormConection = createConnection({ type: 'postgres', ...ormConfig });

    try {
      // Await for all the promise
      const values: any[] = await Promise.all([typeormConection]);

      // Bind typeorm connection  
      this.container
        .bind<Connection>(SERVICE_IDENTIFIERS.DatabaseConnection)
        .toConstantValue(values[0]);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
