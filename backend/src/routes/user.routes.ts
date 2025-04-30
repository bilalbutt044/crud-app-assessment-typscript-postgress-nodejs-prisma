import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controller/user.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.use(authenticate);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
