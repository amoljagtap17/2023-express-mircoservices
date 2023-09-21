import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import promBundle from "express-prom-bundle";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";
import { NotFoundError } from "./globals/errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";
import { healthController } from "./routes/health/health.controller";

const app = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
});

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

app.use("/", healthController);

app.use(metricsMiddleware);

app.use(
  "/api/products-app",
  createProxyMiddleware({
    target: "http://products-app-service:3000",
    changeOrigin: true,
  })
);

// kubectl port-forward service/prometheus-service 9090:9090
/* app.use(
  "/prometheus",
  createProxyMiddleware({
    target: "http://prometheus-service:9090",
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(/^\/prometheus/, ""),
  })
); */

app.all("*", (_req: Request, _res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
