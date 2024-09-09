import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';  // Solid icons
import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <FontAwesomeIcon icon={faClock} className="text-yellow-500 text-6xl mt-8 mb-4" />  
      <p className="font-bold text-white text-3xl">time.fyi</p>
      <p className="text-white text-lg mt-2 mb-6">
        Time related tools to help you stay productive and organized
      </p>
      <button className="bg-yellow-500 text-black p-3 rounded-md">
        Start App
      </button>
      <p className='text-sm text-white mt-4 mb-2'> No sign-up required</p>
    </div>
  );
};

export default Hero;
