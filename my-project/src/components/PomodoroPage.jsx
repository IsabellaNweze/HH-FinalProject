import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCalendarAlt, faSquareCheck } from '@fortawesome/free-solid-svg-icons'; // Import the calendar icon
import Calendar from 'react-calendar'; // Import the react-calendar
import 'react-calendar/dist/Calendar.css'; // Import calendar CSS

const PomodoroPage = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar visibility
  const [date, setDate] = useState(new Date()); // Track selected date
  const [showDialog, setShowDialog] = useState(false); // Toggle dialog visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false); // Close calendar after selecting a date
  };

  const handleDialogOpen = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  // Format the date as "11 Sep"
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

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
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '2 1 40%' }}>
            <div className="flex justify-between items-center">
              <p
                className="text-white text-sm cursor-pointer mr-[-2] hover:bg-gray-700 p-2 rounded transition duration-300"
                onClick={() => console.log("Pending clicked")}
              >
                Pending
              </p>
              <p
                className="text-white text-sm cursor-pointer mr-8 hover:bg-gray-700 p-2 rounded transition duration-300"
                onClick={() => console.log("Completed clicked")}
              >
                Completed
              </p>
              <div
                className="text-white text-sm cursor-pointer flex items-center space-x-2 hover:bg-gray-700 p-2 rounded transition duration-300"
                onClick={toggleCalendar}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Show calendar when clicked */}
            {showCalendar && (
              <div className="bg-gray-700 p-4 mt-4 rounded-lg w-80 h-auto">
               
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="text-black" // Ensure the calendar text is visible
                />
                </div>
              
            )}

            <div className="bg-gray-800 p-4 rounded-lg text-white flex-grow flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faSquareCheck} className='text-4xl text-gray-500 mb-4'/>
              <p className='text-gray-500 text-sm'>No task for this day</p>
              <p
                className='text-gray-500 underline cursor-pointer hover:text-gray-400'
                onClick={handleDialogOpen}
              >
                Add a new task
              </p>
            </div>
          </div>

          {/* Second card: 60% width */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '3 1 60%' }}>
            <div className="bg-gray-700 p-4 rounded-lg text-white flex-grow">
              {/* Pomodoro timer and controls */}
              <FontAwesomeIcon icon={faPlay} className="text-white text-3xl mb-4" />
              <p className="text-4xl mb-4">25:00</p>
              <div className="flex space-x-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Start
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg mb-4 text-gray-500 font-bold">Login / Sign up</p>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white  py-2 px-4 rounded"
                onClick={handleDialogClose}
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

export default PomodoroPage;
