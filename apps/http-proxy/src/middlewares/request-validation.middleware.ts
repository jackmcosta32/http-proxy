import { ONE_DAY } from '@/constants/time.constant';
import { BlockList } from '@/data-structures/block-list';
import type { NextFunction, Request, Response } from 'express';
import { flagMaliciousHeaders } from '@/utils/headers/flag-malicious-headers';
import { getRequestIdentifier } from '@/utils/session/get-request-identifier';
import { BAD_REQUEST, FORBIDDEN } from '@/constants/http-status-code.constant';

const blockList = new BlockList();

export const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestIdentifier = getRequestIdentifier(req);

  if (blockList.isBlocked(requestIdentifier)) {
    return res.status(FORBIDDEN).json({
      message: 'Your access has been blocked'
    });
  }

  const isMalicious = flagMaliciousHeaders(req.headers as Record<string, string>);

  if (isMalicious) {
    blockList.block(requestIdentifier, {
      reason: isMalicious,
      duration: 30 * ONE_DAY // 30 days
    });

    return res.status(BAD_REQUEST).json({
      message: isMalicious
    });
  }

  next();
}