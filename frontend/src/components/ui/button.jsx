import React from "react";

export function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        disabled
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-accent hover:bg-blue-700 text-white shadow-md"
      }`}
    >
      {children}
    </button>
  );
}
