import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
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
        } catch (error) {
            // FIXED: Added optional chaining (?.) and a fallback message
            toast.error(error.response?.data?.message || "Login failed. Is the server running?");
        } finally {
            set({ isLoggingIn: false });
        }
    }
}));