import { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import { Prisma } from "@prisma/client";
import { comparePasswords, hashPassword } from "../utils/bcryptHandler";
import * as authService from "../services/auth.services";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    const hashedPassword = await hashPassword(data.password);

    const user = await authService.registerUser(data, hashedPassword);
    const token = generateToken(String(user.id));
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.log("register error", error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await authService.loginUser(data);
    if (!user || !(await comparePasswords(data.password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(String(user.id));
    res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.log("login error", error);
    next(error);
  }
};
