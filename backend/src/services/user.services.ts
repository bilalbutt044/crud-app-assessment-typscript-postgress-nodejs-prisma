import { UpdateUserSchema } from "../schema/user.schema";
import { prisma } from "../utils/db";

export const listUsers = async (pageNumber: number, pageSize: number) => {
  const users = await prisma.user.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    select: { id: true, name: true, email: true, createdAt: true },
  });

  // Count total number of users for pagination information
  const totalUsers = await prisma.user.count();

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / pageSize);

  return { users, totalUsers, totalPages };
};

export const updateUser = async (id: string, data: UpdateUserSchema) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};
