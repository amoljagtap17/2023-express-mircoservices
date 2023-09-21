import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";
import { NotFoundError } from "./globals/errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";

const app = express();

// extra layer of obsecurity to reduce server fingerprinting.
app.disable("x-powered-by");

app.disable("etag");

// protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10kb",
    parameterLimit: 5,
  })
);

app.use(bodyParser.json());

app.use(
  "/api/products-app",
  createProxyMiddleware({
    target: "http://products-app-service:3000",
    changeOrigin: true,
  })
);

app.all("*", (_req: Request, _res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
