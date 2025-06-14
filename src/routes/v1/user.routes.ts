import { Router } from "express";

import { validate } from "../../middlewares/validate";
import { createUserSchema, updateUserSchema } from "../../shared/validations/user.validations";

// controllers
import UserController from "../../controllers/user.controller";

const router = Router();

const userController = new UserController();

/**
 * @route POST /v1/users
 * @description Create new user
 */
router.post("/", validate(createUserSchema), userController.create);

/**
 * @route GET /v1/users?page=1&limit=10&sortOrder=DESC
 * @description get all users
 * @query page - number page (default: 1)
 * @query limit - users per page (default: 10, max: 100)
 * @query sortOrder - order (ASC, DESC)
 */
router.get("/", userController.findAll);

/**
 * @route GET /v1/users/:id
 * @description get one user by id
 * @param id - id of the user
 */
router.get("/:id", userController.findById);

/**
 * @route DELEATE /v1/users
 * @description deleate user by id
 * @param id - id of the user
 */
router.delete("/:id", userController.delete);

/**
 * @route PUT /v1/users
 * @description update user by id
 * @param id - id of the user
 * @body name - name of the user
 * @body lastname - lastname of the user
 * @body email - email of the user
 * @body rfc - rfc of the user
 * @body zip_code - zip code of the user
 * */

router.put("/:id", validate(updateUserSchema), userController.update);

export default router;
