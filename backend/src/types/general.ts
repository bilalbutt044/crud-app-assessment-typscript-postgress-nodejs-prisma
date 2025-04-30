import { User } from "@prisma/client";

export type UpdateUser = Omit<User, "createdAt" | "updatedAt" | "id">;
export type RegisterUser = Omit<User, "createdAt" | "updatedAt" | "id">;
export type LoginUser = Omit<User, "createdAt" | "updatedAt" | "id" | "name">;
