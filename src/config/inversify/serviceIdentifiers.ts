const SERVICE_IDENTIFIERS = {
  UserService: Symbol.for('UserService'),
  HttpLoggerMiddleware: Symbol.for('HttpLoggerMiddleware'),
  LoggerService: Symbol.for('LoggerService'),
  DatabaseConnection: Symbol.for('DatabaseConnection')
};

export default SERVICE_IDENTIFIERS;
