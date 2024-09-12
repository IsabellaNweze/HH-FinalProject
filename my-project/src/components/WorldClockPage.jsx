import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Sidebar from './Sidebar';
import { loadTimezonesFromLocalStorage, saveTimezonesToLocalStorage } from './timezoneStorage';

const WorldClockPage = () => {
  const [timezonesList, setTimezonesList] = useState(loadTimezonesFromLocalStorage() || []);
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleTimeZoneSelect = (location) => {
    const existingIndex = timezonesList.findIndex((tz) => tz.location === location);
    if (existingIndex === -1) {
      const newTimezone = {
        location,
        time: moment()?.tz(location)?.format('h:mm:ss A'),
        isEditing: false,
        searchTerm: '',
      };
      const updatedTimezones = [...timezonesList, newTimezone];
      setTimezonesList(updatedTimezones);
      saveTimezonesToLocalStorage(updatedTimezones);
    }
    setSearchTerm('');
    setShowPopup(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimezonesList((prevList) =>
        prevList.map((tz) => ({
          ...tz,
          time: moment()?.tz(tz.location)?.format('h:mm A'),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeZoneList = moment.tz.names();

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 p-8 transition-all duration-300 transform ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="flex h-full gap-4">
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '2 1 40%' }}>
            <div className="flex justify-between items-center mb-4">
              <button
                className="mx-28 bg-gray-800 text-gray-400 py-2 px-4 rounded hover:bg-gray-600 "
                onClick={togglePopup}
              >
                + Add a Timezone
              </button>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg h-full overflow-y-auto">
              <ul className="list-none">
                {timezonesList.map((tz, index) => (
                  <li key={index} className="text-gray-400 text-md mb-2 flex justify-between items-center">
                  <span>{tz.location}</span>
                  <span>{tz.time}</span>
                </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '3 1 60%' }}>
            <h2 className="text-white text-lg mb-4">World Clock</h2>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white p-2 rounded w-full"
                placeholder="Search for timezones"
              />
              {searchTerm && (
                <ul className="absolute bg-gray-700 text-white rounded shadow-md w-full mt-1 max-h-60 overflow-auto z-10">
                  {timeZoneList.filter((tz) => tz.toLowerCase().includes(searchTerm.toLowerCase())).map((tz) => (
                    <li
                      key={tz}
                      onClick={() => handleTimeZoneSelect(tz)}
                      className="p-2 hover:bg-gray-600 cursor-pointer"
                    >
                      {tz}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-white text-lg mb-4">Add a new timezone</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-700 text-white p-2 rounded w-full mb-4"
              placeholder="Search for timezones"
            />
            <ul className="list-none max-h-60 overflow-auto">
              {timeZoneList.filter((tz) => tz.toLowerCase().includes(searchTerm.toLowerCase())).map((tz) => (
                <li
                  key={tz}
                  onClick={() => handleTimeZoneSelect(tz)}
                  className="p-2 text-white cursor-pointer hover:bg-gray-600"
                >
                  {tz}
                </li>
              ))}
            </ul>
            <button
              onClick={togglePopup}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldClockPage;
