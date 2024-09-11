import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import moment from 'moment-timezone';

const TimezonePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [timezonesList, setTimezonesList] = useState([
    {
      id: 1,
      location: 'America/New_York',
      time: moment()?.tz('America/New_York')?.format('hh:mm A'),
      date: moment()?.tz('America/New_York')?.format('YYYY-MM-DD'),
      isEditing: false,
      searchTerm: '',
      dropdownOpen: false
    },
  ]);

  const timezones = moment.tz.names();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Update the time and date for each card every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimezonesList((prevList) =>
        prevList.map((tz) => ({
          ...tz,
          time: moment()?.tz(tz.location)?.format('hh:mm A'),
          date: moment()?.tz(tz.location)?.format('YYYY-MM-DD'),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Handle timezone selection
  const handleTimezoneSelect = (id, timezone) => {
    setTimezonesList((prevList) =>
      prevList.map((tz) =>
        tz.id === id
          ? {
              ...tz,
              location: timezone,
              time: moment()?.tz(timezone)?.format('hh:mm A'),
              date: moment()?.tz(timezone)?.format('YYYY-MM-DD'),
              isEditing: false,
              searchTerm: '',
            }
          : tz
      )
    );
  };

  // Handle search input change
  const handleSearchChange = (id, value) => {
    setTimezonesList((prevList) =>
      prevList.map((tz) =>
        tz.id === id ? { ...tz, searchTerm: value } : tz
      )
    );
  };

  // Add a new empty timezone card
  const addNewTimezone = (e) => {
    e.preventDefault(); // Prevent default action to stop any unwanted behavior

    setTimezonesList((prevList) => [
      ...prevList,
      {
        id: prevList.length + 1,
        location: '',
        time: '',
        date: '',
        isEditing: true,
        searchTerm: '',
      },
    ]);
  };

  // Remove a timezone card
  const removeTimezone = (id) => {
    setTimezonesList((prevList) => prevList.filter((tz) => tz.id !== id));
  };

  // Filter timezones based on search term
  const filteredTimezones = (searchTerm) =>
    timezones.filter((tz) =>
      tz.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-8 transition-all duration-300 transform ${
          isOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <div className="flex flex-wrap gap-4">
          {timezonesList.map((tz) => (
            <div
              key={tz.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex-1 min-w-[200px] max-w-[350px] relative"
            >
              <h2 className="text-white text-md mb-2">
                {tz.isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={tz.searchTerm}
                      onChange={(e) => handleSearchChange(tz.id, e.target.value)}
                      className="bg-gray-700 text-white p-2 rounded w-full"
                      placeholder="Timezone, City, Country"
                    />
                    {filteredTimezones(tz.searchTerm).length > 0 && (
                      <ul className="absolute bg-gray-700 text-white rounded shadow-md w-full mt-1 max-h-60 overflow-auto z-10">
                        {filteredTimezones(tz.searchTerm).map((timezone) => (
                          <li
                            key={timezone}
                            onClick={() =>
                              handleTimezoneSelect(tz.id, timezone)
                            }
                            className="p-2 hover:bg-gray-600 cursor-pointer"
                          >
                            {timezone}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <span
                    onClick={() =>
                      setTimezonesList((prevList) =>
                        prevList.map((item) =>
                          item.id === tz.id
                            ? { ...item, isEditing: true }
                            : item
                        )
                      )
                    }
                    className="cursor-pointer"
                  >
                    {tz.location || 'Select Timezone'}
                  </span>
                )}
              </h2>
              <p className="text-gray-400 mb-2">{tz.time}</p>
              <p className="text-gray-500">{tz.date}</p>

              {/* Delete button */}
              <button
                type="button" // Ensure it's a button type
                onClick={() => removeTimezone(tz.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                🗑
              </button>
            </div>
          ))}

          {/* Add Timezone Button */}
          <div
            onClick={addNewTimezone}
            className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center min-w-[200px] cursor-pointer"
          >
            <button
              type="button" // Ensure it's a button type
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
