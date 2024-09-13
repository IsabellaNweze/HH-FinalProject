import React, { useState, useEffect, useRef} from 'react';
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
  const [mode, setMode] = useState('focus'); // Track current mode (focus, short break, long break)
  const [time, setTime] = useState(1500); // Time in seconds (25 * 60 by default for focus mode)
  const [isRunning, setIsRunning] = useState(false); // To track whether the timer is running
 // const [intervalId, setIntervalId] = useState(null); // To store the interval ID for the timer
 const intervalRef = useRef(null);

  // Handle timer countdown
  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      
    } else if (time === 0) {
      setIsRunning(false); // Stop the timer if it reaches 0
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  // Format the time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  };

  // Handle switching modes (focus, short break, long break)
  const handleModeSwitch = (newMode) => {
    setIsRunning(false); // Stop the timer when switching modes
    setMode(newMode);
    switch (newMode) {
      case 'focus':
        setTime(1500); // 25 minutes
        break;
      case 'shortBreak':
        setTime(300); // 5 minutes
        break;
      case 'longBreak':
        setTime(900); // 15 minutes
        break;
      default:
        setTime(1500);
    }
  };

  // Handle increasing the timer
  const increaseTime = (minutes) => {
    setTime((prevTime) => prevTime + minutes * 60);
  };

  // Handle starting the timer
  const startTimer = () => {
    if (time > 0 && !isRunning) {
      setIsRunning(true);
    }
  };

  // Handle pausing the timer
  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Handle resuming the timer
  const resumeTimer = () => {
    if (time > 0 && !isRunning) {
      setIsRunning(true);
    }
  };

  // Handle resetting the timer
  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    switch (mode) {
      case 'focus':
        setTime(1500); // Reset to 25 minutes
        break;
      case 'shortBreak':
        setTime(300); // Reset to 5 minutes
        break;
      case 'longBreak':
        setTime(900); // Reset to 15 minutes
        break;
      default:
        setTime(1500);
    }
  };

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
    <div className="bg-black min-h-screen flex flex-col lg:flex-row">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-4 lg:p-8 transition-all duration-300 transform ${
          isOpen ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        <div className="flex h-full gap-4 flex-col lg:flex-row">
          {/* First card: 40% width */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '2 1 40%' }}>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
              <p
                className="text-white text-sm cursor-pointer hover:bg-gray-700 p-2 rounded transition duration-300 mb-2 lg:mb-0"
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
            <div className="bg-gray-800 p-4 rounded-lg text-white flex-grow">
              
              
               {/* Mode selector (Focus, Short Break, Long Break) */}
            <div className=" flex justify-center items-center space-x-4 text-gray-500 mb-4">
              <span
                className={`cursor-pointer p-2 ${
                  mode === 'focus' ? 'bg-gray-700 rounded-lg' : ''
                }`}
                onClick={() => handleModeSwitch('focus')}
              >
                Focus
              </span>
              <span
                className={`cursor-pointer p-2 ${
                  mode === 'shortBreak' ? 'bg-gray-700 rounded-lg' : ''
                }`}
                onClick={() => handleModeSwitch('shortBreak')}
              >
                Short Break
              </span>
              <span
                className={`cursor-pointer p-2 ${
                  mode === 'longBreak' ? 'bg-gray-700 rounded-lg' : ''
                }`}
                onClick={() => handleModeSwitch('longBreak')}
              >
                Long Break
              </span>
            </div>

            {/* Timer Display */}
            <div className="bg-gray-800 p-4 rounded-lg text-white flex-grow text-center mt-20">
              <p className="text-7xl mb-4 font-bold">{formatTime(time)}</p>
              <hr className=" border-2 border-gray-700 mb-2 font-bold" />


              {/* Timer adjustment options (not buttons) */}
              <div className="flex justify-center space-x-4  mb-4 text-gray-500">
                <span className="cursor-pointer" onClick={() => increaseTime(25)}>+25min</span>
                <span className="cursor-pointer" onClick={() => increaseTime(10)}>+10min</span>
                <span className="cursor-pointer" onClick={() => increaseTime(5)}>+5min</span>
                <span className="cursor-pointer" onClick={() => increaseTime(1)}>+1min</span>
              </div>

              {/* Timer controls */}
              {!isRunning ? (
                <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-8 rounded mb-2 mx-2" onClick={startTimer}>
                  Start
                </button>
              ) : (
                <>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-8 rounded mb-2 mx-2" onClick={pauseTimer}>
                    Pause
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white  py-2 px-8 rounded mb-2 mx-2" onClick={resumeTimer}>
                    Resume
                  </button>
                </>
              )}
              <button className="bg-gray-500 hover:bg-gray-600 text-white  py-2 px-8 rounded mt-2 mx-2" onClick={resetTimer}>
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
