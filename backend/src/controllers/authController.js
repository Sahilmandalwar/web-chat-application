import { ENV } from "../lib/env.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async(req,res)=>{
   const {fullName, email, password} = req.body;

   try{
        // checking presence of all field
        if(!fullName || !email || !password) {
            return res.status(400).json({message : "All Field Are Required..."})
        }

        // check if email is valid: regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid Email format"})
        }


        // check for password length
        if(password.length < 6) {
            return res.status(400).json({message : "Password must be atleast 6 characters"})
        }
        
        // check whether user with same email exists
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "Email Already exists!"});
        }

        // hashing purpose
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);


        // newUser object
        const newUser = new User({
            fullName,
            email,
            password : hashPassword
        })



        if(newUser) {
            const savedUser = await newUser.save();           // new user saving to database
            generateToken(savedUser._id,res)  // generate token for user

            res.status(201).json({
                _id: savedUser._id,
                fullName:savedUser.fullName,
                email : savedUser.email,
                
            })

            // todo: send a welcome email to user
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.name, ENV.CLIENT_URL)
            }catch(error) {
                console.error(("Failed to send Welcome Email:", error))
            }

        }else{
            res.status(400).json({message:"Invalid user Data"});
        }

    }catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({message : "Internal server problem"})
    }
}

export const login = async(req,res)=>{
    const {email, password} = req.body;
    try {
            if(!email || !password) {
                return res.status(400).json({
                    message: "Both Email and Password Fields are mandatory",
                })
            }

            const user = await User.findOne({email}); 
            if(!user) {
            return res.status(400).json({
                    message: "Invalid Credientials",
                })
            }

            const passwordMatched = await bcrypt.compare(password, user.password);

            if(!passwordMatched) {
                return res.status(400).json({
                    message: "Invalid Credientials",
                }) 
            }

            generateToken(user._id, res);
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email : user.email,
                        
            })
    }
    catch(error){
        console.log("Error in login controller", error);
        res.status(500).json({message : "Internal server error"})
    }
   

}

export const logout = (_,res)=>{
    res.cookie("jwt_token","", {
        maxAge: 0
    }).status(200).json({
        message: "Logged Out Successfully"
    })
}

export const updateProfile = async(req,res) => {
    try {
        const {profilePic} = req.body;

        if(!profilePic) {
            return res.status(400).json({
                message: "Profile Pic is required.",
            })
        }

        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url,
        },{
            new: true
        }).select("-password")

        res.status(200).json({
            message: "profile Pic Updated",
            updatedUser
        })

    }catch(error) {
        console.log("Error in update profile: ",error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

