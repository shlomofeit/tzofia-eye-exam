import { errorCreator } from "../utils/errorHandler.js";
import { alertSchema } from "../utils/validation.js";

export async function createAlertService(alert) {
  const validation = alertSchema.safeParse(alert);
  if (!validation.success)
    throw errorCreator(400, validation.error.issues[0].message);

  return validation.data;
}
