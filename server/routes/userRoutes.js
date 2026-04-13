import express from "express";
import { loginUser, registerUser } from "../controlllers/userController.js";


const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser );

export default userRoutes;