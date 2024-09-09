import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component

const TimezonePage = () => {
  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar /> {/* Include the Sidebar here */}
      <div className="flex-1 p-8 ml-64"> {/* Adjust margin to avoid overlap with sidebar */}
        <h1 className="text-white text-4xl">Timezone Module</h1>
        {/* Content for the TimezonePage */}
      </div>
    </div>
  );
};

export default TimezonePage;
