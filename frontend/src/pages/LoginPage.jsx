import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageCircleIcon,
  MailIcon,
  LoaderIcon,
  LockIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // FIXED: imported from react-router-dom
import BorderAnimated from "../components/BorderAnimated";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn, authUser } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    if(authUser) {
      navigate("/");
    }
  };

  return (
    // 1. Changed to min-h-screen and responsive padding
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900 overflow-y-auto">
      {/* 2. Removed fixed heights, max-w-5xl to match signup page */}
      <div className="relative w-full max-w-5xl my-8">
        <BorderAnimated>
          {/* 3. Added items-stretch and glassmorphism background */}
          <div className="w-full flex flex-col md:flex-row items-stretch rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm">
            {/* FORM COLUMN - LEFT SIDE */}
            {/* 4. Flexible padding for different screen sizes */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md mx-auto">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
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
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto text-center" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link text-sm sm:text-base">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            {/* 5. Flex container updates to keep image centered */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-8 lg:p-12 bg-linear-to-bl from-slate-800/40 to-transparent">
              <div className="max-w-sm text-center">
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
                <div className="mt-8">
                  <h3 className="text-xl lg:text-2xl font-medium text-cyan-400">
                    Connect anytime, anywhere
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
}

export default LoginPage;
