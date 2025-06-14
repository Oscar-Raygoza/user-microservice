import { StatusCodes } from "../shared/constants/http.constants";

import { Request, Response, NextFunction, RequestHandler } from "express";

export const validate =
  (schema: any): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        message: error?.details?.map((detail: any) => detail.message),
      });
      return;
    }

    next();
  };
