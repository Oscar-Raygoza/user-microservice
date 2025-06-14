/**
 * @author Oscar Eduardo Raygoza <oscar.eduardo.raygoza@gmail.com>
 * @version v0.1.0
 * @description Backend para startup.
 * @filename APP.TS
 * @date 13/June/2025
 */

import express, { Application } from "express";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";

// routes
import userRoutes from "./routes/v1/user.routes";

// limiter
import { createRateLimiter } from "./middlewares/rateLimiter";

// db
import { Database } from "./config/database";

// errors middleware
import errorHandler from "./middlewares/errorHandler";

export default class App {
  private readonly app: Application;
  private readonly database: Database;

  constructor() {
    this.app = express();
    this.database = Database.getInstance();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());

    this.app.use(
      cors({
        origin: process.env.ALLOWED_ORIGINS?.split(",") ?? "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    // rate limiting
    this.app.use(createRateLimiter());

    // compresión
    this.app.use(compression());

    // parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use("/v1/users/", userRoutes);
  }

  public async initialize(): Promise<void> {
    try {
      await this.database.testConnection();

      this.database.getPool();
    } catch (error) {
      console.error("Error:", error);

      throw error;
    }
  }

  public getApp(): Application {
    return this.app;
  }
}
