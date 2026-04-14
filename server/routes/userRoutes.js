import express from "express";
import { getUserData, loginUser, registerUser } from "../controlllers/userController.js";
import protect from "../middleware/auth.js";


const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser );

//protected route to get user data using token
userRoutes.get("/data", protect, getUserData);

export default userRoutes;