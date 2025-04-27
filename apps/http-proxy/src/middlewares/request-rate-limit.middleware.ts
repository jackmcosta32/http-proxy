import { TokenBucket } from '@/data-structures/token-bucket';
import type { NextFunction, Request, Response } from 'express';
import { TOO_MANY_REQUESTS } from '@/constants/http-status-code.constant';
import { getRequestIdentifier } from '@/utils/session/get-request-identifier';

const REQUEST_FILL_RATE = 5;
const MAX_REQUESTS_PER_SECOND = 10;

const buckets = new Map<string, TokenBucket>();

export const requestRateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestIdentifier = getRequestIdentifier(req);

  if (!requestIdentifier) return next();

  let userBucket = buckets.get(requestIdentifier);

  if (!userBucket) {
    userBucket = new TokenBucket({ capacity: MAX_REQUESTS_PER_SECOND, fillRate: REQUEST_FILL_RATE });
    
    buckets.set(requestIdentifier, userBucket);
  }

  if (!userBucket.withdraw()) {
    return res.status(TOO_MANY_REQUESTS).json({
      message: 'Too many requests, please try again later.'
    });
  }

  return next();
}