import express from "express";
import { getCars, getUserData, loginUser, registerUser } from "../controlllers/userController.js";
import protect from "../middleware/auth.js";
import { get } from "mongoose";


const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser );
userRoutes.get('/cars', getCars);

//protected route to get user data using token
userRoutes.get("/data", protect, getUserData);


export default userRoutes;