import { NextFunction, Request, Response } from "express";
import { AbstractError } from "../globals/errors/abstract-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AbstractError) {
    const errors = err.serializeErrors();

    return res.status(err.statusCode).json({ errors });
  }

  console.error(
    `500 - "Something went wrong" - ${req.originalUrl} - ${req.method}`
  );

  res.status(500).json({
    errors: [{ message: "Something went wrong" }],
  });
};
