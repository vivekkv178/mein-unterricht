import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";

import routes from "./routes/index";
import COMMON_CONFIG from "./config/common-config";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(COMMON_CONFIG.BASE_ROUTE, routes);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

export default app;
