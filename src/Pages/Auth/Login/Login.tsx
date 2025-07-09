import { addToast, ToastProvider } from "@heroui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBg from "@/assets/images/login-bg.jpg";
import InfinityLogo from "@/assets/images/infinity.png";
import { SyncLoader } from "react-spinners";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const apiUrl = "http://192.168.123.147:8080/api/auth/login";
      const response = await axios.post(apiUrl, {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.data.access_token);
      addToast({
        title: "Login Success",
        description: response.data.message,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      return addToast({
        title: "Login Failed",
        description: error.response.data.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastProvider placement="top-right" toastOffset={60} />
      <div
        className="h-screen bg-cover bg-no-repeat bg-bottom flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${LoginBg})`,
          backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent black overlay
          backgroundBlendMode: "darken",
        }}
      >
        <div className="max-w-md w-full backdrop-blur-lg bg-white/20 px-12 pb-12 rounded-3xl shadow-[11px_20px_15px_0px_rgba(0,_0,_0,_0.8)]">
          <div className="flex flex-col items-center pb-6">
            {/* <h2 className="text-3xl font-bold text-center">Login</h2> */}
            <img src={InfinityLogo} className="w-32" />
            <p className="text-sm font-light text-white text-center">
              Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-white">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? <SyncLoader color="#ffffff" size={7} /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
