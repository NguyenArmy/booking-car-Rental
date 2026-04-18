import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

//generate token jwt
const generateToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

}
//register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password || password.length < 8){
            return res.status(400).json({ success: false, message: "Please provide all required fields with valid input" });
        }

        //check if user aready exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        //hash password\
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashedPassword
        })
        const token = generateToken(user._id.toString());

        return res.status(201).json({
            success: true,
            message: "Register successful",
            token,
            
        });
       
        
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Server error" });
        
    }
}
//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id.toString());
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
           
        });
        
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Server error" });
        
    }
}

//get User data using Token (JWT)
const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.status(200).json({
            success: true,
            user,
            isOwner: user.role === "owner",
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
//get all cars
const getCars = async (req, res) => {
    try {
        const cars = await Car.find({isAvailable: true});
        res.status(200).json({ success: true, cars });
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}



export { registerUser, loginUser, getUserData, getCars };