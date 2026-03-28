import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimated from "../components/BorderAnimated.jsx";
import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


const SignUpPage = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isSigningUp, signup, authUser } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    if (authUser) {
      navigate("/");
    }
  };

  return (
    // 1. Changed to min-h-screen so it always covers the full viewport height safely
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900 overflow-y-auto">
      {/* 2. Removed fixed heights completely. Added w-full and max-w-5xl */}
      <div className="relative w-full max-w-5xl my-8">
        <BorderAnimated>
          {/* 3. Added items-stretch to make left and right columns equal height on desktop */}
          <div className="w-full flex flex-col md:flex-row items-stretch rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm">
            {/* FORM COLUMN - LEFT SIDE */}
            {/* 4. Swapped fixed heights for flexible vertical padding (py-10) */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md mx-auto">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn w-full mt-4"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link text-sm sm:text-base">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            {/* 5. Kept hidden on mobile, flexible padding on desktop */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-8 lg:p-12 bg-linear-to-bl from-slate-800/40 to-transparent">
              <div className="max-w-sm text-center">
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
                <div className="mt-8">
                  <h3 className="text-xl lg:text-2xl font-medium text-cyan-400">
                    Start Your Journey Today
                  </h3>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimated>
      </div>
    </div>
  );
};

export default SignUpPage;
