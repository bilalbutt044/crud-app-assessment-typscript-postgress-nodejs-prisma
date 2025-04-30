import { LoginUser, RegisterUser } from "../types/general";
import { prisma } from "../utils/db";

export const registerUser = async (data: RegisterUser, hashedPassword: string) => {
  return prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
};

export const loginUser = async (data: LoginUser) => {
  return prisma.user.findUnique({ where: { email: data.email } });
};
