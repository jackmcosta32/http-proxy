import type { Request } from "express";
import { REQUEST_IDENTIFIER_COOKIE } from "@/constants/cookies.constant";

export const getRequestIdentifier = (req: Request) => {
  const ip = req.ip ?? req.socket.remoteAddress;
  const requestIdentifier = ip ?? req.cookies[REQUEST_IDENTIFIER_COOKIE] as string;

  return requestIdentifier;
}
