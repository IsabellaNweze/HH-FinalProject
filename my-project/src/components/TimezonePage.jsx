import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import moment from 'moment-timezone';

const TimezonePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTimezone, setCurrentTimezone] = useState({
    location: 'America/New_York',
    time: moment().tz('America/New_York').format('hh:mm A'),
    date: moment().tz('America/New_York').format('YYYY-MM-DD')
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const timezones = moment.tz.names();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimezone((prev) => ({
        ...prev,
        time: moment().tz(prev.location).format('hh:mm A'),
        date: moment().tz(prev.location).format('YYYY-MM-DD')
      }));
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTimezoneClick = () => {
    setIsEditing(true);
    handleDropdownToggle();
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTimezoneSelect = (timezone) => {
    setCurrentTimezone({
      location: timezone,
      time: moment().tz(timezone).format('hh:mm A'),
      date: moment().tz(timezone).format('YYYY-MM-DD')
    });
    setSearchTerm(''); // Clear search term after selection
    setDropdownOpen(false);
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTimezones = timezones.filter((tz) =>
    tz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-8 transition-all duration-300`}
        style={{
          marginLeft: isOpen ? '16rem' : '4rem',
        }}
      >
        <div className="flex gap-4 mb-8">
          {/* Timezone Card */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md flex-1 min-w-[200px] max-w-[350px]">
            <h2 className="text-white text-md mb-2">
              {isEditing ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="bg-gray-700 text-white p-2 rounded w-full"
                    placeholder="Type to search..."
                  />
                  <button
                    onClick={handleDropdownToggle}
                    className="absolute right-2 top-2"
                  >
                    ▼
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute bg-gray-700 text-white rounded shadow-md w-full mt-1 max-h-60 overflow-auto">
                      {filteredTimezones.length ? (
                        filteredTimezones.map((tz) => (
                          <li
                            key={tz}
                            onClick={() => handleTimezoneSelect(tz)}
                            className="p-2 hover:bg-gray-600 cursor-pointer"
                          >
                            {tz}
                          </li>
                        ))
                      ) : (
                        <li className="p-2">No results found</li>
                      )}
                    </ul>
                  )}
                </div>
              ) : (
                <span
                  onClick={handleTimezoneClick}
                  className="cursor-pointer"
                >
                  {currentTimezone.location}
                </span>
              )}
            </h2>
            <p className="text-gray-400 mb-2"> {currentTimezone.time}</p>
            <p className="text-gray-500"> {currentTimezone.date}</p>
          </div>

          {/* Add Timezone Button */}
          <div className="flex-shrink-0 bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center min-w-[200px]">
            <button
              onClick={() => alert('Add timezone functionality not yet implemented')}
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 flex items-center"
            >
              <span className="text-2xl mr-2 text-gray-500">+</span>
              <p className="text-gray-500 text-lg text-bold">Add Timezone</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimezonePage;
