import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuthStore } from './store/useAuthStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import PageLoader from './components/PageLoader';
import {Toaster} from "react-hot-toast";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (  
        <LoginPage />
     )
  },
  {
    path: "/signup",
    element:  (
        <SignUpPage  />
    )
  },
]);


const App = () => {

  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth) {
    return <PageLoader /> 
  }

  return (
    <div
      className={
        "min-h-screen  bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden wrap"
      }
    >
      {/* 1. PINK GLOW (Top-Left) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* 2. CYAN GLOW (Bottom-Right) */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse [animation-delay:2s]"></div>

      {/* 3. PROFESSIONAL GRID OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-[0.15] mask-[radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-size-[5px_5px]"></div>
      </div>

      {/* 4. LINEAR GRADIENT BACKGROUND TINT (Optional but smooths everything out) */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  
  );
}

export default App
