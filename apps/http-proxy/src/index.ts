import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import express, { type Request, type Response } from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { requestRateLimitMiddleware } from "./middlewares/request-rate-limit.middleware";
import { requestIdentifierMiddleware } from "./middlewares/request-identifier.middleware";
import { requestValidationMiddleware } from "./middlewares/request-validation.middleware";

const app = express();

const proxyMiddleware = createProxyMiddleware<Request, Response>({
  target: process.env.PROXY_TARGET_URL,
  changeOrigin: true,
});

app.use(cookieParser());
app.use(loggerMiddleware);
app.use(requestIdentifierMiddleware);
app.use(requestRateLimitMiddleware as never);
app.use(requestValidationMiddleware as never);
app.use('/', proxyMiddleware);

const port = process.env.PROXY_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Proxy is running on http://localhost:${port}`);
});