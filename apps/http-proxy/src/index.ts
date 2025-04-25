import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import express, { type Request, type Response } from "express";

const app = express();

const proxyMiddleware = createProxyMiddleware<Request, Response>({
  target: process.env.PROXY_TARGET_URL,
  changeOrigin: true,
});

app.use(cookieParser());
app.use('/', proxyMiddleware);

const port = process.env.PROXY_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Proxy is running on http://localhost:${port}`);
});