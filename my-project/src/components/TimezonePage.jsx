import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Sidebar from './Sidebar';
import { loadTimezonesFromLocalStorage, saveTimezonesToLocalStorage } from './timezoneStorage';

const TimezonePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [timezonesList, setTimezonesList] = useState(loadTimezonesFromLocalStorage() || [
    { id: 1, location: 'America/New_York', time: '', date: '', isEditing: false, searchTerm: '' },
  ]);
console.log(timezonesList);
  const timezones = moment.tz.names();

  const toggleSidebar = () => setIsOpen(!isOpen);

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

  useEffect(() => {
    saveTimezonesToLocalStorage(timezonesList);
  }, [timezonesList]);

  const handleTimezoneSelect = (id, timezone) => {
    setTimezonesList((prevList) =>
      prevList.map((tz) =>
        tz.id === id
          ? { ...tz, location: timezone, time: moment().tz(timezone).format('hh:mm A'), date: moment().tz(timezone).format('YYYY-MM-DD'), isEditing: false, searchTerm: '' }
          : tz
      )
    );
  };

  const handleSearchChange = (id, value) => {
    setTimezonesList((prevList) =>
      prevList.map((tz) => (tz.id === id ? { ...tz, searchTerm: value } : tz))
    );
  };

  const addNewTimezone = (e) => {
    e.preventDefault();
    setTimezonesList((prevList) => [
      ...prevList,
      { id: prevList.length + 1, location: '', time: '', date: '', isEditing: true, searchTerm: '' },
    ]);
  };

  const removeTimezone = (id) => {
    setTimezonesList((prevList) => prevList.filter((tz) => tz.id !== id));
  };

  const filteredTimezones = (searchTerm) =>
    timezones.filter((tz) => tz.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 p-8 transition-all duration-300 transform ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="flex flex-wrap gap-4">
          {timezonesList.map((tz) => (
            <div key={tz.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex-1 min-w-[200px] max-w-[350px] relative">
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
                            onClick={() => handleTimezoneSelect(tz.id, timezone)}
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
                          item.id === tz.id ? { ...item, isEditing: true } : item
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
              <button
                type="button"
                onClick={() => removeTimezone(tz.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                🗑
              </button>
            </div>
          ))}

          <div
            onClick={addNewTimezone}
            className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center min-w-[200px] cursor-pointer"
          >
            <button
              type="button"
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
