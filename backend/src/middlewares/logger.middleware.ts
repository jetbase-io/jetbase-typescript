import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.log(`Request...`, req.method, req.originalUrl);
  next();
}
