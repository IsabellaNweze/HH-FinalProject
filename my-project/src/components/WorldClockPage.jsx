import React, { useState } from 'react';
import moment from 'moment-timezone';
import Sidebar from './Sidebar'; // Import the Sidebar component

const WorldClockPage = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default
  const [showPopup, setShowPopup] = useState(false); // Toggle popup visibility
  const [timeZones, setTimeZones] = useState([]); // List of time zones
  const [searchTerm, setSearchTerm] = useState(''); // Search term for time zones
  const [selectedTimeZone, setSelectedTimeZone] = useState(''); // Selected time zone

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTimeZoneSelect = (zone) => {
    setSelectedTimeZone(zone);
  };

  const handleAddTimeZone = () => {
    if (selectedTimeZone) {
      setTimeZones([...timeZones, selectedTimeZone]);
      setSelectedTimeZone(''); // Clear selection after adding
      setSearchTerm(''); // Clear search term
      setShowPopup(false); // Close popup
    }
  };

  // Generate current time in each time zone
  const getTimeInTimeZone = (zone) => {
    return moment().tz(zone).format('MMMM Do YYYY, h:mm:ss a');
  };

  // Time zone options
  const timeZoneList = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 
    'Europe/London', 'Europe/Berlin', 'Europe/Moscow', 'Asia/Tokyo', 'Australia/Sydney'
    // Add more time zones as needed
  ];

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-8 transition-all duration-300 transform ${
          isOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <div className="flex h-full gap-4">
          {/* First card: 40% width */}
          <div
            className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full"
            style={{ flex: '2 1 40%' }}
          >
            <div className="flex justify-between items-center mb-4">
            
              <button
                className=" mx-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={togglePopup}
              >
                + Add Timezone
              </button>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg h-full overflow-y-auto">
              <ul className="list-none">
                {timeZones.map((zone, index) => (
                  <li key={index} className="text-white text-sm mb-2">
                    {zone}: {getTimeInTimeZone(zone)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Second card: 60% width */}
          <div
            className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full"
            style={{ flex: '3 1 60%' }}
          >
            <h2 className="text-white text-xl mb-4">Additional Information</h2>
            <p className="text-gray-500">This is the second card. Add additional information or functionality here.</p>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-white text-xl mb-4">Add Timezone</h2>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Timezones"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              />
              <div className="max-h-60 overflow-y-auto mb-4">
                <ul className="list-none">
                  {timeZoneList
                    .filter(zone => zone.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((zone, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer p-2 hover:bg-gray-600 ${selectedTimeZone === zone ? 'bg-gray-600' : ''}`}
                        onClick={() => handleTimeZoneSelect(zone)}
                      >
                        {zone}
                      </li>
                    ))}
                </ul>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                onClick={handleAddTimeZone}
              >
                Add
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={togglePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldClockPage;
