import { REQUEST_IDENTIFIER_COOKIE } from '@/constants/cookies.constant';
import type { NextFunction, Request, Response } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log({
    clientIp: req.ip,
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    sessionId: req.cookies[REQUEST_IDENTIFIER_COOKIE],
  });

  next();
}