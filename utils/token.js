import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}
import { userTokenSchema } from "../validation/token.validation.js";

export const createToken = async (payload) => {
  const validationResult = await userTokenSchema.safeParseAsync(payload);
  if (!validationResult.success)
    throw new Error(validationResult.error.message);
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

export const validateUserToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
};
