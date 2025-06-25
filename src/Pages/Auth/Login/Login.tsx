import { addToast, ToastProvider } from "@heroui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBg from "@/assets/images/login-bg.jpg";

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
        <div className="max-w-md w-full backdrop-blur-lg bg-white/5  p-8 rounded-lg shadow-[11px_20px_15px_0px_rgba(0,_0,_0,_0.8)]">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                //   required
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
