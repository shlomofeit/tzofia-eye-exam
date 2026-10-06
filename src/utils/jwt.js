import "dotenv/config";
import jwt from "jsonwebtoken";
import { errorCreator } from "./errorHandler.js";

const secretKey = process.env.SECRET;
if (!secretKey)
  throw errorCreator(500, "no secret in env, pls create a secret");

export function generateToken(user) {
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, secretKey);
}
