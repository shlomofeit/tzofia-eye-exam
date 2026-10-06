import { getDb } from "../db/db.js";
import { userRepo } from "../repo/auth.repo.js";
import { verifyId } from "../services/alerts.service.js";
import {
  loginService,
  registerService,
  userValidationService,
} from "../services/auth.service.js";
import { errorCreator } from "../utils/errorHandler.js";

const db = await getDb();
const collection = db.collection("users");
await collection.createIndex({ email: 1 }, { unique: true });
await collection.createIndex({ username: 1 }, { unique: true });

export async function register(req, res) {
  const user = await registerService(req.body);
  const result = await userRepo(collection).createUser(user);

  res.status(201).json({ success: true, data: result });
}

export async function login(req, res) {
  const { username, password } = await userValidationService(req.body);
  const exist = await userRepo(collection).getUserByUsername(username);
  if (!exist) throw errorCreator(401, "Invalid credentials");

  const result = await loginService(password, exist);
  res.status(200).json({ success: true, data: result });
}

export async function getMe(req, res) {
  res.status(200).json({ success: true, data: req.user });
}

export async function getUsers(req, res) {
  const result = await userRepo(collection).getUsers();

  res.status(200).json({ success: true, data: result });
}

export async function deleteUser(req, res) {
  const id = req.params.id;
  verifyId(id);
  const result = await userRepo(collection).deleteById(id);
  if (!result) throw errorCreator(404, "User not found");

  res.status(200).json({ success: true, data: `id: ${id} deleted sussefully` });
}
