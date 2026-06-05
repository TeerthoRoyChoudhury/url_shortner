import db from "../src/db/index.js";
import { urlsTable } from "../models/url.model.js";
import { eq, and } from "drizzle-orm";
import { usersTable } from "../models/user.model.js";

export const dbInsert = async (url, shortcode, userId) => {
  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode: shortcode,
      targetURL: url,
      userId: userId,
    })
    .returning({
      url_id: urlsTable.id,
      shortcode: urlsTable.shortCode,
      target_url: urlsTable.targetURL,
    });
  return result;
};

export const getbyshortcode = async (code) => {
  const [result] = await db
    .select({
      targetUrl: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));
  return result;
};

export const usercodes = async (id) => {
  const allCodes = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, id));

  if (allCodes.length === 0) throw new Error("No user Found");
  return allCodes;
};

export const deleteurl = async (id, userId) => {
  const deleted = await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, userId)))
    .returning();
  return deleted;
};
