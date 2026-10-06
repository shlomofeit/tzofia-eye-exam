import express from "express";
import {
  alertCreatorCrtls,
  deleteAlert,
  getAll,
  getById,
  updateById,
} from "../crtls/alerts.crtl.js";
import { authenticate, roleValidation } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/alerts", alertCreatorCrtls);
router.get("/alerts", getAll);
router.get("/alerts/:id", getById);
router.put("/alerts/:id", updateById);
router.delete(
  "/alerts/:id",
  authenticate,
  roleValidation("admin", "arena_user"),
  deleteAlert,
);

export default router;
