import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCalendarAlt, faBell, faClock, faAppleWhole, faStopwatch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} z-40`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 p-2 text-white bg-gray-800 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      
      <nav className="flex flex-col items-center mt-16">
        <Link
          to="/timezone"
          className={`flex items-center mb-4 p-2 rounded transition-all duration-300 ${isOpen ? 'w-full justify-start px-4' : 'justify-center w-16'}`}
        >
          <FontAwesomeIcon icon={faGlobe} className={`text-gray-500 text-2xl mr-2 ${!isOpen ? 'hidden' : 'block'}`} />
          <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Timezones</span>
        </Link>
        <Link
          to="/pomodoro"
          className={`flex items-center mb-4 p-2 rounded transition-all duration-300 ${isOpen ? 'w-full justify-start px-4' : 'justify-center w-16'}`}
        >
          <FontAwesomeIcon icon={faAppleWhole} className={`text-gray-500 text-2xl mr-2 ${!isOpen ? 'hidden' : 'block'}`} />
          <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Pomodoro</span>
        </Link>
   
        <Link
          to="/worldclock"
          className={`flex items-center mb-4 p-2 rounded transition-all duration-300 ${isOpen ? 'w-full justify-start px-4' : 'justify-center w-16'}`}
        >
          <FontAwesomeIcon icon={faClock} className={`text-gray-500 text-2xl mr-2 ${!isOpen ? 'hidden' : 'block'}`} />
          <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>World Clock</span>
        </Link>
     
        <Link
          to="/stopwatch"
          className={`flex items-center mb-4 p-2 rounded transition-all duration-300 ${isOpen ? 'w-full justify-start px-4' : 'justify-center w-16'}`}
        >
          <FontAwesomeIcon icon={faStopwatch} className={`text-gray-500 text-2xl mr-2 ${!isOpen ? 'hidden' : 'block'}`} />
          <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Stopwatch</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
