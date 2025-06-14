import { StatusCodes } from "../constants/http.constants";

export class AppError extends Error {
  public statusCode: StatusCodes;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
