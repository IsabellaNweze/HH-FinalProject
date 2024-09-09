import React from 'react';


const Card = ({ logo, title, text }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center text-white">
      {/* Logo (Icon or Image) */}
      <div className="mb-4 text-4xl">
        {logo}
      </div>

      {/* Title in bold */}
      <h2 className="font-bold text-xl mb-2">
        {title}
      </h2>

      {/* Text content */}
      <p className="text-gray-500">
        {text}
      </p>
    </div>
  );
};

export default Card;
