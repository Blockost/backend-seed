import express from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';

import HttpLoggerMiddleware from '../httpLoggerMiddleware';

@injectable()
export default class HttpLoggerMiddlewareImpl extends BaseMiddleware
  implements HttpLoggerMiddleware {
  private readonly morganRequestHandler: express.RequestHandler;

  constructor() {
    super();

    // Setup rotating log file
    const fileStream = rfs('app.http-logger.log', {
      size: '1M', // Rotate log file when it exceeds 1 Megabyte
      path: 'log/' // path is relative to the root folder of the application
    });

    // Setup morgan custom log format
    const logFormat =
      ':date[iso] [:remote-addr] :method :url :status :response-time ms - :res[content-length]';

    // Instantiate morgan logger middleware
    this.morganRequestHandler = morgan(logFormat, { stream: fileStream });
  }

  handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.morganRequestHandler(req, res, next);
  }
}
