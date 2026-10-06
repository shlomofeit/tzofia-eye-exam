import express from "express";
import {
  getMe,
  deleteUser,
  getUsers,
  login,
  register,
} from "../crtls/auth.ctrl.js";
import { authenticate, roleValidation } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", authenticate, getMe);
router.post("/register", authenticate, roleValidation("admin"), register);
router.get("/users", authenticate, roleValidation("admin"), getUsers);
router.delete("user/:id", authenticate, roleValidation("admin"), deleteUser);

export default router;
