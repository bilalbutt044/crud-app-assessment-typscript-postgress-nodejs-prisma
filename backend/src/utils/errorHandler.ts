import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

/**
 * Error formatter for Prisma, Zod, and generic errors
 */
export function handleError(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    res.status(400).json({
      type: "validation_error",
      errors: formattedErrors,
    });
    return;
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle unique constraint error (like duplicate email)
    if (err.code === "P2002") {
      res.status(409).json({
        type: "conflict_error",
        message: `A record with this ${err.meta?.target} already exists.`,
      });
      return;
    }

    // Add more Prisma error codes as needed
    res.status(500).json({
      type: "prisma_error",
      message: "Database error occurred.",
      details: err.message,
    });
    return;
  }

  // Handle generic or unknown errors
  res.status(500).json({
    type: "server_error",
    message: "An unexpected error occurred.",
    details: err instanceof Error ? err.message : String(err),
  });
  return;
}
