import express from 'express';

export default interface HttpLoggerMiddleware {
  handler(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
