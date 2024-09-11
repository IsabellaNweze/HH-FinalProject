import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Make sure the path to Sidebar is correct

const StopwatchPage = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-8 transition-all duration-300 transform ${
          isOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Main content of the StopwatchPage */}
        <div className="flex h-full gap-4">
          {/* First card: 60% width */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '3 1 60%' }}>
            <h1 className="text-white text-2xl mb-4">Stopwatch 1</h1>
            {/* Stopwatch functionality will go here */}
            <div className="bg-gray-700 p-4 rounded-lg text-white flex-grow">
              {/* Stopwatch display and controls */}
            </div>
          </div>

          {/* Second card: 40% width */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '2 1 40%' }}>
            <h1 className="text-white text-2xl mb-4">Stopwatch 2</h1>
            {/* Stopwatch functionality will go here */}
            <div className="bg-gray-700 p-4 rounded-lg text-white flex-grow">
              {/* Stopwatch display and controls */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopwatchPage;
