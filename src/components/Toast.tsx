import React from "react";

const Toast: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="absolute mt-[150px] bg-white text-gray-900 px-8 py-4 font-bold rounded-md text-lg border border-gray-300 shadow-xl z-10">
      {message}
    </div>
  );
};

export default Toast;
