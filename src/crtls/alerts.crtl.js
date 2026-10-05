import { getDb } from "../db/db.js";
import { createRepo } from "../repo/alerts.repo.js";
import { createAlertService } from "../services/alerts.service.js";

const db = await getDb();
const collection = db.collection("alerts");

export async function alertCreatorCrtls(req, res) {
  try {
    const alert = req.body;
    const validCheck = await createAlertService(alert);

    const result = await createRepo(collection).createAlert(validCheck);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    throw error;
  }
}
