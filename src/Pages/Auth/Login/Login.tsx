import { addToast, Button, Input, ToastProvider } from "@heroui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBg from "@/assets/images/login-bg.jpg";
import InfinityLogo from "@/assets/images/hotel-logo.svg";
import { Checkbox } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleSVG from "../../../components/Svg/google";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    http: try {
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

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
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
        <div className="max-w-md w-full bg-axolotl-100 p-12 rounded-3xl shadow-[11px_20px_15px_0px_rgba(0,_0,_0,_0.8)]">
          <div className="flex flex-col items-center pb-6 gap-2">
            {/* <h2 className="text-3xl font-bold text-center">Login</h2> */}
            <img src={InfinityLogo} className="w-40" />
            <p className="text-sm font-light text-black text-center">
              Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}

            <Input
              label="Email"
              type="email"
              value={email}
              isRequired
              radius="sm"
              size="sm"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <Input
              label="Password"
              type={isVisible ? "text" : "password"}
              value={password}
              isRequired
              size="sm"
              radius="sm"
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-lg text-yuma-300 pointer-events-none" />
                  ) : (
                    <FaEye className="text-lg text-yuma-300  pointer-events-none" />
                  )}
                </button>
              }
            />
            {/* Remember me & Forgot Password */}
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
            {/* Submit */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full gradient-bg text-white rounded-md py-6"
            >
              Login
            </Button>

            {/* Google Auth */}
            <Button
              isLoading={loading}
              fullWidth
              variant="bordered"
              className="py-6"
            >
              <GoogleSVG className={""} size={22} />
              <p className="text-sm font-light">Sign In with google</p>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
