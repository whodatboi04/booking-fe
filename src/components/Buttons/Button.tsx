import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  props?: any;
}

// Primary Button
export const PrimaryButton: React.FC<ButtonProps> = ({
  children = "Primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className="bg-[#C9C096] px-10 py-2 text-white rounded-sm hover:bg-[#A8A07B] transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

// Bounce Button
export const BounceButton: React.FC<ButtonProps> = ({
  children = "Bounce",
  ...props
}) => {
  return (
    <button
      {...props}
      className="border-green-500 text-green-500 font-semibold py-2 px-6 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 ease-in-out animate-bounce"
    >
      {children}
    </button>
  );
};

// Gradient Button
export const GradientButton: React.FC<ButtonProps> = ({
  children = "Gradient",
  ...props
}) => {
  return (
    <button
      {...props}
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};
