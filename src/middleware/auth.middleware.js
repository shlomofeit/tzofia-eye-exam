import { errorCreator } from "../utils/errorHandler.js";
import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw errorCreator(401, "Unauthorized");

  const token = authHeader.split(" ")[1];
  try {
    req.user = verifyToken(req.token);
  } catch {
    throw errorCreator(401, "Invalid token");
  }

  next();
}

export function roleValidation(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw errorCreator(403, "no appropriate permission");

    next();
  };
}
