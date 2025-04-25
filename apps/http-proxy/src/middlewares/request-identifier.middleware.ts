import { v4 as uuidv4 } from 'uuid';
import { ONE_DAY } from '@/constants/time.constant';
import type { NextFunction, Request, Response } from 'express';
import { REQUEST_IDENTIFIER_COOKIE } from '@/constants/cookies.constant';

export const requestIdentifierMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const currentRequestId = req.cookies[REQUEST_IDENTIFIER_COOKIE] as string;

  if (currentRequestId) return next();

  const requestId = uuidv4();
  const currentTimestamp = Date.now();
  const expirationDate = new Date(currentTimestamp + ONE_DAY);

  res.cookie(REQUEST_IDENTIFIER_COOKIE, requestId, {
    secure: true,
    httpOnly: true,
    expires: expirationDate
  })

  return next();
}