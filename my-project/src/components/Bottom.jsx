import React from 'react';

const Bottom = () => {
  return (
    <div className="bg-black text-white py-4 mt-auto">
      {/* Links Section */}
      <div className="flex justify-center space-x-8 mb-4">
        <a
          href="#"
          className="hover:bg-gray-700 px-3 py-1 rounded transition-colors duration-300 text-gray-500"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:bg-gray-700 px-3 py-1 rounded transition-colors duration-300 text-gray-500"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:bg-gray-700 px-3 py-1 rounded transition-colors duration-300 text-gray-500"
        >
          Refund Policy
        </a>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500">
        © 2024 time.fyi - Your ultimate time management companion
      </div>
    </div>
  );
}

export default Bottom;
