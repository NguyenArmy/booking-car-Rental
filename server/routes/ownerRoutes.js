import express from "express";
import protect from "../middleware/auth.js";
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability } from "../controlllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRoutes = express.Router();


ownerRoutes.post('/change-role', protect, changeRoleToOwner)
ownerRoutes.post('/add-car', upload.single("image"), protect, addCar)
ownerRoutes.post("/cars", protect, getOwnerCars)
ownerRoutes.post("/toggle-car", protect, toggleCarAvailability)
ownerRoutes.post("/delete-car", protect, deleteCar)
ownerRoutes.get("/dashboard", protect, getDashboardData)

export default ownerRoutes;