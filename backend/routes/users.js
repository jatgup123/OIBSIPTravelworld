import express from 'express';
import { updateUser, deleteUser, getSingleUser, getAllUser, getMya } from '../controllers/userController.js';

const router = express.Router();
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getSingleUser);

router.get("/", verifyAdmin, getAllUser);

router.get("a/getMya", verifyUser, getMya);

export default router;