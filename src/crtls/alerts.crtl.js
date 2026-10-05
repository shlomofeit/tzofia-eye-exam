import { getDb } from "../db/db.js";
import { createRepo } from "../repo/alerts.repo.js";
import {
  createAlertService,
  updateAlertService,
  verifyId,
} from "../services/alerts.service.js";
import { errorCreator } from "../utils/errorHandler.js";

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

export async function getAll(req, res) {
  const result = await createRepo(collection).getAlerts();

  res.status(200).json({ success: true, data: result });
}

export async function getById(req, res) {
  const id = req.params.id;
  verifyId(id);
  const result = await createRepo(collection).getAlertsById(id);
  if (!result) throw errorCreator(404, "Alert not found");

  res.status(200).json({ success: true, data: result });
}

export async function updateById(req, res) {
  const alert = req.body;
  const id = req.params.id;
  verifyId(id);
  const validCheck = await updateAlertService(alert);
  const exist = await createRepo(collection).getAlertsById(id);
  if (!exist) throw errorCreator(404, "Alert not found");

  const result = await createRepo(collection).updateById(id, validCheck);

  res.status(200).json({ success: true, data: result });
}

export async function deleteAlert(req, res) {
  const id = req.params.id;
  verifyId(id);
  const result = await createRepo(collection).deleteById(id);
  if (!result) throw errorCreator(404, "Alert not found");

  res.status(200).json({ success: true, data: `id: ${id} deleted sussefully` });
}
