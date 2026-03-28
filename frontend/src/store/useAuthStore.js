import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/"

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();

        } catch (error) {
            console.log("Internal Error Occurred ", error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully...!");
            get().connectSocket();
        } catch (error) {
            // FIXED: Added optional chaining (?.) and a fallback message
            toast.error(error.response?.data?.message || "Registration failed. Is the server running?");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            
            // FIXED: Corrected 'autUser' to 'authUser'
            set({ authUser: res.data }); 
            
            toast.success("Account logged in successfully...!");
            get().connectSocket();
        } catch (error) {
            // FIXED: Added optional chaining (?.) and a fallback message
            toast.error(error.response?.data?.message || "Login failed. Is the server running?");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully...");
            get().disconnectSocket();
        }catch(error) {
            toast.error("Error logging out");
            console.log("Logout error: ", error.message);
        }
    },

    updateProfile : async(data) =>{
        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");

        }catch (error) {
            console.log("Error in update profile:", error);
            toast.error(error.response.data.message);
        }
    }, 

    connectSocket : () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected)  {
            return;
        }

        const socket = io(BASE_URL, {
            withCredentials: true, // to ensure that cookie are send with the connection
        })

        socket.connect();

        set({socket});

        socket.on("getOnlineUsers",(userIds) => {
            set({onlineUsers: userIds});
        });
    },

    disconnectSocket: ()=> {
        if(get().socket?.connected) get().socket.disconnet
    }

}));