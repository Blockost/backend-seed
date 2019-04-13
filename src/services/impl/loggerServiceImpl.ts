import winston from 'winston';
import { injectable } from 'inversify';

import LoggerService from '../loggerService';

@injectable()
export default class LoggerServiceImpl implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Log only if level is info or below (i.e more important)
      format: winston.format.combine(
        winston.format.timestamp(), // default date format is ISO
        winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [
        // Rotate log file if it exceeds 1MB
        new winston.transports.File({ filename: 'log/app.log', maxsize: 1000000 })
      ],
      exceptionHandlers: [
        // Rotate log file if it exceeds 1MB
        new winston.transports.File({ filename: 'log/app.log', maxsize: 1000000 })
      ],
      exitOnError: false // Do not exit after logging an uncaught exception
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string, error?: Error): void {
    message = error ? `${message} - ${error.message}. Stacktrace: ${error.stack}` : `${message}`;
    this.logger.error(message);
  }
}
