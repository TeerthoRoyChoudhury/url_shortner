import express from "express";
import * as urlController from "../controller/url.controller.js";
import { ensureAuthenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/shorten", ensureAuthenticate, urlController.urlShorten);

router.get("/codes", ensureAuthenticate, urlController.usersurl);

router.delete("/:id", ensureAuthenticate, urlController.removeurl);

router.get("/:shortcode", urlController.getUrlByShortcode);

export default router;
