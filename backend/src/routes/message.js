import express from "express";
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("all your message here...")
})
router.get("/send",(req,res)=>{
    res.send("send your message here...")
})


export default router;
