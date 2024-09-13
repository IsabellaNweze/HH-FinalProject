import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Sidebar from './Sidebar';
import { loadTimezonesFromLocalStorage, saveTimezonesToLocalStorage } from './timezoneStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faClock, faChartLine, faTh } from '@fortawesome/free-solid-svg-icons';
import Clock from './Clock';

const WorldClockPage = () => {
  const [timezonesList, setTimezonesList] = useState(loadTimezonesFromLocalStorage() || []);
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [displayMode, setDisplayMode] = useState('default');

  const toggleSidebar = () => setIsOpen(!isOpen);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleTimeZoneSelect = (location) => {
    const selected = timezonesList.find((tz) => tz.location === location);
    setSelectedTimezone(selected);
    setDisplayMode('default');
    setSearchTerm('');
    setShowPopup(false);
  };

  const handleDelete = (location) => {
    const updatedTimezones = timezonesList.filter((tz) => tz.location !== location);
    setTimezonesList(updatedTimezones);
    saveTimezonesToLocalStorage(updatedTimezones);
    if (selectedTimezone?.location === location) {
      setSelectedTimezone(null);
    }
  };

  const handleDisplayModeChange = (mode) => setDisplayMode(mode);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimezonesList((prevList) =>
        prevList.map((tz) => (tz.location === selectedTimezone?.location ? {
          ...tz,
          time: moment()?.tz(tz.location)?.format('h:mm A'),
        } : tz))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimezone]);

  const timeZoneList = moment.tz.names();

  return (
    <div className="bg-black min-h-screen flex flex-col md:flex-row">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} className="md:w-64" />

      <div className={`flex-1 p-4 md:p-8 transition-all duration-300 transform ${isOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Timezone List Section */}
          <div className="flex-1 bg-gray-800 p-4 lg:p-6 rounded-lg shadow-md flex flex-col h-full lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-gray-800 text-gray-400 py-2 px-4 rounded hover:bg-gray-600"
                onClick={togglePopup}
              >
                + Add a Timezone
              </button>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg h-full overflow-y-auto">
              <ul className="list-none">
                {timezonesList.map((tz, index) => (
                  <li key={index} className="mb-2">
                    <div
                      className="text-gray-400 text-md flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2"
                      onClick={() => handleTimeZoneSelect(tz.location)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(tz.location);
                        }}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                        aria-label="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} className='mr-2' />
                      </button>
                      <span className="flex-1">{tz.location}</span>
                      <span>{tz.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Selected Timezone Section */}
          <div className="flex-1 bg-gray-800 p-4 lg:p-6 rounded-lg shadow-md flex flex-col h-full lg:w-2/3">
            <h2 className="text-white text-lg mb-4">World Clock</h2>

            {selectedTimezone ? (
              <div className="relative flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-4">
                    <button
                      className={`p-2 rounded ${displayMode === 'clock' ? 'bg-gray-600' : 'bg-gray-700'}`}
                      onClick={() => handleDisplayModeChange('clock')}
                    >
                      <FontAwesomeIcon icon={faClock} />
                    </button>
                    <button
                      className={`p-2 rounded ${displayMode === 'graph' ? 'bg-gray-600' : 'bg-gray-700'}`}
                      onClick={() => handleDisplayModeChange('graph')}
                    >
                      <FontAwesomeIcon icon={faChartLine} />
                    </button>
                    <button
                      className={`p-2 rounded ${displayMode === 'default' ? 'bg-gray-600' : 'bg-gray-700'}`}
                      onClick={() => handleDisplayModeChange('default')}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                  </div>
                </div>

                {displayMode === 'default' && (
                  <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                    <h1 className="text-white text-2xl mb-4">{selectedTimezone.location}</h1>
                    <p className="text-white text-6xl font-extrabold mt-4 mb-12">{selectedTimezone.time}</p>
                    <p className="text-white text-xl font-semibold">
                      {moment().tz(selectedTimezone.location).format('dddd, MMMM D, YYYY')}
                    </p>
                  </div>
                )}

                {displayMode === 'clock' && (
                  <div>
                    <Clock initialTime={selectedTimezone.time} />
                  </div>
                )}

                {displayMode === 'graph' && (
                  <div className="bg-gray-900 p-4 rounded-lg flex flex-col items-center">
                    <p className="text-white text-lg mb-2">Time Graph (Placeholder)</p>
                    <div className="w-full bg-gray-700 h-40 rounded">
                      {/* Placeholder for the graph */}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-white text-lg">Select a timezone to see details.</p>
            )}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full md:w-80">
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
