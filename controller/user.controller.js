import db from "../src/db/index.js";
import { usersTable } from "../models/index.js";
import { eq } from "drizzle-orm";
import {
  signupPostRequestBodySchema,
  loginPostRequstBodySchema,
} from "../validation/req.validation.js";

import { hashPasswordWithSalt } from "../utils/hash.js";
import { getUserByEmail, insertUserDetails } from "../services/user.service.js";
import { createToken } from "../utils/token.js";

export const userSignup = async (req, res) => {
  try {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
      req.body,
    );
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.message });
    }
    const { firstName, lastName, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        error: `User with email ${email} already exists`,
      });
    }

    const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

    const user = await insertUserDetails(
      firstName,
      lastName,
      email,
      salt,
      hashedPassword,
    );

    return res.status(201).json({
      message: "Successfully signed up",
      userId: user.id,
    });
  } catch (error) {
    // Log only sanitized error information
    console.error("Signup Error:", error.message);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const validationResult = await loginPostRequstBodySchema.safeParseAsync(
      req.body,
    );
    if (!validationResult.success)
      return res.status(400).json({ error: validationResult.error.message });
    const { email, password } = validationResult.data;
    const user = await getUserByEmail(email);
    if (!user)
      return res.status(404).json({ error: `Email ${email} does not exist` });

    const { password: hashedpassword } = hashPasswordWithSalt(
      password,
      user.salt,
    );
    if (user.password != hashedpassword)
      return res.status(400).json({ error: `Invalid password` });
    const payload = { id: user.id };
    const token = await createToken(payload);
    return res.json({ status: "Success", token });
  } catch (error) {
    return res.status(500).json({ error: "Unable to Login, please try again" });
  }
};
