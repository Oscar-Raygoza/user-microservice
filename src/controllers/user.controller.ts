import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "../shared/constants/http.constants";
import { UserMessages } from "../shared/constants/user.constants";

import UserRepository from "../repository/user.repository";

export default class UserController {
  private readonly _userRepository = new UserRepository();

  public findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { page, limit, sortBy, sortOrder } = req.query;

      const users = await this._userRepository.findAll({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: (sortBy as string) || "created_at",
        sortOrder: (sortOrder as "ASC" | "DESC") || "DESC",
      });

      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  public findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await this._userRepository.findById(req.params.id);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [UserMessages.USER_NOT_FOUND],
        });
      }

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._userRepository.create(req.body);

      res.status(StatusCodes.CREATED).json({
        message: [UserMessages.USER_CREATED_SUCCESSFULLY],
        code: StatusCodes.CREATED,
      });
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        res.status(StatusCodes.CONFLICT).json({
          code: StatusCodes.CONFLICT,
          message: [UserMessages.EMAIL_ALREADY_REGISTERED],
        });
      }

      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._userRepository.update(req.params.id, req.body);

      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: [UserMessages.USER_UPDATED_SUCCESSFULLY],
      });
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        res.status(StatusCodes.CONFLICT).json({
          code: StatusCodes.CONFLICT,
          message: [UserMessages.EMAIL_ALREADY_REGISTERED],
        });
      }

      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._userRepository.softDelete(req.params.id);

      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: [UserMessages.USER_DELETED_SUCCESSFULLY],
      });
    } catch (error) {
      next(error);
    }
  };
}
