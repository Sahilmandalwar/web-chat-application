import express from "express";
const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("Signup Endpoint")
})
router.get("/LogIn",(req,res)=>{
    res.send("Login Endpoint")
})
router.get("/LogOut",(req,res)=>{
    res.send("Logout Endpoint")
})

export default router;
