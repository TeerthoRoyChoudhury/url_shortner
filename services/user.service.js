import db from "../src/db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email) => {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstname: usersTable.firstname,
      lastname: usersTable.lastname,
      salt: usersTable.salt,
      password: usersTable.password,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
};

export const insertUserDetails = async (
  firstName,
  lastName,
  email,
  salt,
  hashedPassword,
) => {
  const [user] = await db
    .insert(usersTable)
    .values({
      firstname: firstName,
      lastname: lastName,
      email,
      salt,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id });
  return user;
};
