import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { ENV } from "../lib/env.js";


export const socketAuthMiddleware =  async(socket, next) => {
  try {
    // 1. Grab the raw cookie string from the request headers
    const cookieString = socket.request.headers.cookie;

    if (!cookieString) {
      return next(new Error("Authentication error: No cookies found"));
    }

    // 2. Parse the cookie exactly like you mentioned!
    // (Assuming your cookie is named 'jwt')
    const tokenCookie = cookieString.split('; ').find(row => row.startsWith('jwt_token='));
    
    if (!tokenCookie) {
      return next(new Error("Authentication error: JWT cookie missing"));
    }

    // Extract the actual token value after the "="
    const token = tokenCookie.split('=')[1];

    // 3. Verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET); 
    if(!decoded) {
        console.log("Socket Connection rejeccted: Invalid token");
        return next(new Error("Unauthorised - Invalid Token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if(!user) {
        console.log("Socket Conection rejected : User not found");
        return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticatd for user : ${user.fullName} (${user._id})`)
    
    next(); 
  } catch (error) {
    next(new Error("Authentication error: ",error.message));
  }
};