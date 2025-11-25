import {
  addToast,
  Button,
  Checkbox,
  Input,
  ToastProvider,
} from "@heroui/react";
import hotelImg from "@/assets/images/login-bg.jpg";
import Logo from "@/assets/images/hotel-logo.svg";
import { useState } from "react";
import axios from "axios";
import config from "../../../config/app.config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    http: try {
      setLoading(true);
      const response = await axios.post(
        config.apiUrl + "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.data.access_token;
      const decoded: any = jwtDecode(token);

      if (decoded.roles[0] !== "superadmin") {
        addToast({
          title: "Invalid Login",
          description: "Please login admin account",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
        return;
      }

      Cookies.set("token", token);
      addToast({
        title: "Login Successfully",
        description: response.data.message,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error: any) {
      addToast({
        title: "Login failed",
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
    <div className="flex flex-col items-center justify-center h-screen">
      <ToastProvider placement="top-right" toastOffset={60} />
      <div className="flex w-1/2 h-[40rem] rounded-2xl shadow-2xl">
        <div className="w-1/2 relative">
          <img
            src={hotelImg}
            alt="Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 p-16">
            <img src={Logo} alt="Infinity Logo" className="w-12" />
            <div className="h-full flex justify-center items-center">
              <h1 className="text-6xl font-bold text-white">Welcome Back!</h1>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-8 w-1/2 p-16"
        >
          <h1 className="text-2xl font-bold text-gray-700">Admin Login</h1>
          <p className="text-sm font-light text-gray-500 w-64">
            Welcome back! Please login to your account.
          </p>
          <div className="flex flex-col gap-6">
            <Input
              isRequired
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              isRequired
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Checkbox size="md">
              <span className="font-light text-sm">Remember Me</span>
            </Checkbox>
            <a
              className="text-sm text-yuma-600 hover:text-yuma-700 active:text-yuma-600"
              href=""
            >
              Forgot Password?
            </a>
          </div>
          <Button
            className="w-full gradient-bg text-white rounded-md py-6"
            isLoading={loading}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
