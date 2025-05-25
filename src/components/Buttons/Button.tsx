import React from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

// Primary Button
export const PrimaryButton: React.FC<ButtonProps> = ({ children = 'Primary', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#C9C096] px-10 py-2 text-white rounded-sm hover:bg-[#A8A07B] transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

// Bounce Button
export const BounceButton: React.FC<ButtonProps> = ({ children = 'Bounce', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border-2 border-green-500 text-green-500 font-semibold py-2 px-6 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 ease-in-out animate-bounce"
    >
      {children}
    </button>
  );
};

// Gradient Button
export const GradientButton: React.FC<ButtonProps> = ({ children = 'Gradient', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};
