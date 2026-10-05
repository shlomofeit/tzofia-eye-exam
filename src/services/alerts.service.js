import { ObjectId } from "mongodb";
import { errorCreator } from "../utils/errorHandler.js";
import { alertSchema, updateAlertSchema } from "../utils/validation.js";

export async function createAlertService(alert) {
  const validation = alertSchema.safeParse(alert);
  if (!validation.success)
    throw errorCreator(400, validation.error.issues[0].message);

  return validation.data;
}

export async function updateAlertService(alert) {
  if (!alert || !Object.keys(alert).length > 0)
    throw errorCreator(400, "At least one field is required");
  const validation = updateAlertSchema.safeParse(alert);
  if (!validation.success)
    throw errorCreator(400, validation.error.issues[0].message);

  return validation.data;
}

export function verifyId(mongoId) {
  const valid = ObjectId.isValid(mongoId);
  if (!valid) throw errorCreator(400, "Invalid alert  id");
  return;
}
