import express from "express";
import { login, register, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { userRegisterSchema, userLoginSchema } from "../schemas/userValidation.js";

const router = express.Router();

router.post("/register", validateRequest(userRegisterSchema), register);
router.post("/login", validateRequest(userLoginSchema), login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;
