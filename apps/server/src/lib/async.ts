import type { Request, Response, NextFunction } from "express";

type Handler = (req: Request, res: Response, next: NextFunction) => unknown;

/** Forwards rejected promises from async handlers to Express's error handler. */
export const ah =
  (fn: Handler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
