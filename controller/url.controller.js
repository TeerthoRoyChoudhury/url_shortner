import { shortenPostRequestBodySchema } from "../validation/req.validation.js";
import { nanoid } from "nanoid";
import {
  dbInsert,
  getbyshortcode,
  usercodes,
  deleteurl,
} from "../services/url.service.js";

export const urlShorten = async (req, res) => {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );
  const userId = req.user.id;
  if (!validationResult.success)
    return res.status(400).json({ error: validationResult.error });
  const { url, code } = validationResult.data;

  const shortcode = code ?? nanoid(6);
  const result = await dbInsert(url, shortcode, userId);
  return res.status(201).json({
    status: `Success`,
    urlID: result.url_id,
    shortCode: result.shortcode,
    targetUrl: result.target_url,
  });
};

export const getUrlByShortcode = async (req, res) => {
  const code = req.params.shortcode;
  if (!code) return res.status(400).json({ error: `Invalid request` });
  const getinfo = await getbyshortcode(code);
  if (!getinfo) return res.status(404).json({ error: `No data found` });
  return res.redirect(getinfo.targetUrl);
};

export const usersurl = async (req, res) => {
  const id = req.user.id;
  const codes = await usercodes(id);
  return res.json({ Codes: codes });
};

export const removeurl = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const result = await deleteurl(id, userId);
    // if (!result) {
    //   return res.status(404).json({ error: "URL not found or not deleted" });
    // }
    if (result.length === 0) {
      return res.status(404).json({
        error: "URL not found",
      });
    }
    return res.status(204).json({ status: `Successfully deleted` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
