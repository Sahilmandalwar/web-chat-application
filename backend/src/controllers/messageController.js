import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import {v2 as cloudinary} from "cloudinary";
export const getAllContact = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({
            _id : {
                $ne: loggedInUserId
            }
        }).select("-password");

        res.status(200).json(filteredUsers);
    }catch(error){
        console.log("Error while fetching Users: ",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getMessagesByUserId = async (req,res) => {
  
    try {
        const loggedInUserId = req.user._id;
        const {id:userToChatId} = req.params;
        const allMessages = await Message.find({
            $or : [
                {senderId: loggedInUserId, receiverId:userToChatId },
                {receiverId: loggedInUserId, senderId:userToChatId },
            ]
        })

        res.status(200).json(allMessages);


    }catch(error) {
        console.log("Error while Fetching Messages of user: ", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const sendMessage = async (req,res) => {
    try {
        const senderId = req.user._id;
        const {id:receiverId} = req.params;
        const {text, image, video} = req.body;

        if(!text && !image && !video) {
            return res.status(400).json({
                message: "Atleast message must contain text, image or video",
            })
        }

        if(senderId === receiverId) {
            return res.status(400).json({
                message: "Sender Cannot Send message to own",
            })
        }

        let receiverExist = await User.exists({_id: receiverId});
        if(!receiverExist) {
            return res.status(404).json({
                message: "Reciever not found",
            })
        }

        let imageURL;
        let videoURL;
        if(image) {
            // upload the image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        if(video) {
            const uploadResponse = await cloudinary.uploader.upload(video,{
                resource_type: "video",
            });
            videoURL = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,image:imageURL,video:videoURL
        })

        const savedMessage = await newMessage.save();

        // todo: send message in real-time if user is online -socket.io
        res.status(200).json({
            message: "New Message created succefully",
            newMessage
        })

    }catch(error){
        console.log("Error while Fetching Messages of user: ", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getChatPartners = async(req,res)=>{
    try {
        const userId = req.user._id;
        const allMessagesOfLoggedInUser = await Message.find({
            $or : [
                {senderId : userId} ,
                {receiverId: userId}
            ]
        })
        const chatPartnerIds = allMessagesOfLoggedInUser.map((msg)=>{
            return msg.senderId.toString() === userId.toString() ? msg.receiverId.toString() : msg.senderId.toString();
        })
        const chatPartners = await User.find({
            _id: {
                $in: 
                    chatPartnerIds
                
            }
        }).select("-password");

        res.status(200).json(chatPartners)

    }catch(error) {
        console.log("Error occured while fetching chatPartners details: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}