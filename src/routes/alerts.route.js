import express from "express";
import {
  alertCreatorCrtls,
  deleteAlert,
  getAll,
  getById,
  updateById,
} from "../crtls/alerts.crtl.js";

const router = express.Router();

router.post("/alerts", alertCreatorCrtls);
router.get("/alerts", getAll);
router.get("/alerts/:id", getById);
router.put("/alerts/:id", updateById);
router.delete("/alerts/:id", deleteAlert);

export default router;
