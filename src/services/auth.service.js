import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { loginSchema, userSchema } from "../utils/validation.js";
import { errorCreator } from "../utils/errorHandler.js";

export async function registerService(user) {
  const { username, password, email, role, assignedArena } = user;
  const cleanEmail = email.toLowerCase().trim();
  const validation = userSchema.safeParse({ email: cleanEmail, ...user });
  if (!validation.success)
    throw errorCreator(400, validation.error.issues[0].message);

  const hashPassword = await bcrypt.hash(password, 12);

  return {
    username,
    password: hashPassword,
    email: cleanEmail,
    role,
    assignedArena,
  };
}

export async function userValidationService(user) {
  const validation = loginSchema.safeParse(user);
  if (!validation.success)
    throw errorCreator(400, validation.error.issues[0].message);
  return validation.data;
}
export async function loginService(password, user) {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw errorCreator(401, "Invalid credentials");

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: generateToken(safeUser) };
}
