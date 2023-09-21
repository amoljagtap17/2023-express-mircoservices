import express, { Request, Response } from "express";
import mongoose from "mongoose";

const healthController = express.Router({ caseSensitive: true });

healthController.get("/liveness", (_req: Request, res: Response) => {
  res.status(200).send("alive :P");
});

healthController.get("/readiness", async (_req: Request, res: Response) => {
  try {
    const state = mongoose.connection.readyState;

    if (state === 1) {
      res.status(200).send("Ready :)");
    } else {
      res.status(500).send("Not Ready :(");
    }
  } catch (error) {
    res.status(500).send("Not Ready :(");
  }
});

export { healthController };
