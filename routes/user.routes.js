import express from "express";
const router = express.Router();
import * as userController from "../controller/user.controller.js";

router.post("/signup", userController.userSignup);

router.post("/login", userController.userLogin);

export default router;
