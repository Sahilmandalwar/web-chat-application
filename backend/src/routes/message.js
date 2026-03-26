import express from "express";
import { getAllContact,getMessagesByUserId,sendMessage,getChatPartners } from "../controllers/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";
const router = express.Router();

// router.use(arcjetProtection)
router.use(protectRoute)


router.get("/contact",getAllContact);
router.get("/chat",getChatPartners);
router.post("/send/:id",sendMessage);
router.get("/:id" ,getMessagesByUserId);



export default router;
