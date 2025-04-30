import { NextFunction, Request, Response } from "express";
import { paginationSchema, userUpdateSchema } from "../schema/user.schema";
import * as UserService from "../services/user.services";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate pagination parameters
    const { page, limit } = paginationSchema.parse(req.query);

    // Set default values if no page or limit is provided
    const pageNumber = page ? parseInt(page) : 1;
    const pageSize = limit ? parseInt(limit) : 10;

    const { users, totalPages, totalUsers } = await UserService.listUsers(pageNumber, pageSize);

    res.json({
      users,
      totalUsers,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = userUpdateSchema.parse(req.body);
    const { id } = req.params;
    const user = await UserService.updateUser(id, data);
    res.json(user);
  } catch (error) {
    console.log("update user error", error);
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
