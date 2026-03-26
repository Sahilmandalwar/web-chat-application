import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/userModel.js";



export const protectRoute = async(req,res,next) => {
    
    try {
        const token = req.cookies.jwt_token;
        if(!token) {
            return res.status(401).json({
                message: "Unauthorised - No token provided"
            });
        }

        const decoded = jwt.verify(token,ENV.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({message: "Unauthorised - Invalid token provided"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(404).json({
            message : "User not found",
        });

        req.user = user;
        next();
    }catch(error) {
        console.log("Error in protectRoute middleWare:", error);
        res.status(500).json({message: "Internal server error"});
    }
}