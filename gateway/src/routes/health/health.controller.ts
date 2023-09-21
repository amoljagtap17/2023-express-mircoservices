import express, { Request, Response } from "express";

const healthController = express.Router({ caseSensitive: true });

healthController.get("/liveness", (_req: Request, res: Response) => {
  res.status(200).send("alive :P");
});

healthController.get("/readiness", async (_req: Request, res: Response) => {
  res.status(200).send("Ready :)");
});

export { healthController };
