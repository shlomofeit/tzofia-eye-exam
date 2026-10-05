import express from "express";
import { alertCreatorCrtls } from "../crtls/alerts.crtl.js";

const router = express.Router();

router.post("/alerts", alertCreatorCrtls);

export default router;
