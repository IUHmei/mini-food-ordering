import express from "express";
import { login, logout, register, getUsers } from "../controllers/authController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", protectedRoute, logout);
router.get("/users", getUsers);

export default router;