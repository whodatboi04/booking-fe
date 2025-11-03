import { Button, Checkbox, Input } from "@heroui/react";
import hotelImg from "@/assets/images/login-bg.jpg";
import Logo from "@/assets/images/hotel-logo.svg";

const AdminLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
        <div className="flex flex-col justify-center gap-8 w-1/2 p-16">
          <h1 className="text-2xl font-bold text-gray-700">Admin Login</h1>
          <p className="text-sm font-light text-gray-500 w-64">
            Welcome back! Please login to your account.
          </p>
          <div className="flex flex-col gap-6">
            <Input isRequired label="Email" type="email" />
            <Input isRequired label="Password" type="password" />
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
          <Button className="w-full gradient-bg text-white rounded-md py-6">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
