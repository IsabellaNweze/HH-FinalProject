import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFlag, faRepeat} from '@fortawesome/free-solid-svg-icons';

const StopwatchPage = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Is the stopwatch running?
  const [isPaused, setIsPaused] = useState(false); // Is the stopwatch paused?
  const [laps, setLaps] = useState([]); // Track lap times

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle the ticking of the stopwatch when it's running
  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increase time by 10ms
      }, 10);
    } else if (isPaused || !isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // Convert time from ms to seconds and milliseconds
  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}s ${milliseconds}ms`;
  };

  // Start the timer
  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  // Pause the timer
  const handlePause = () => {
    setIsPaused(true);
  };

  // Resume the timer
  const handleResume = () => {
    setIsPaused(false);
  };

  // Reset the timer
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsPaused(false);
    setLaps([]); // Clear laps
  };

  // Mark a lap
  const handleLap = () => {
    const lapTime = time - (laps.length > 0 ? laps[laps.length - 1].overall : 0);
    setLaps((prevLaps) => [
      ...prevLaps,
      { lapNumber: prevLaps.length + 1, lapTime, overall: time }
    ]);
  };

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-8 transition-all duration-300 transform ${
          isOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <div className="flex h-full gap-4">
          {/* First card: 60% width */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '3 1 60%' }}>
            
            <div className="bg-gray-800 p-4 rounded-lg text-white flex-grow flex flex-col items-center justify-center">
              {/* Display the formatted time */}
              <h2 className="text-4xl mb-4 ">{formatTime(time)}</h2>

              {/* Buttons logic */}
              {!isRunning ? (
                <button
                  className="bg-gray-700 hover:bg-gray-500 text-white  py-2 px-4 rounded"
                  onClick={handleStart}
                >
                   <FontAwesomeIcon icon={faPlay} className='mr-2' />Start Timer
                </button>
              ) : (
                <>
                  <div className="flex space-x-4">
                    {!isPaused ? (
                      <button
                        className="bg-gray-700 hover:bg-gray-500 text-white  py-2 px-4 rounded"
                        onClick={handlePause}
                      >
                       <FontAwesomeIcon icon={faPause} className='mr-2'/> Pause
                      </button>
                    ) : (
                      <button
                        className="bg-gray-700 hover:bg-gray-500 text-white  py-2 px-4 rounded"
                        onClick={handleResume}
                      >
                        <FontAwesomeIcon icon={faPlay} className='mr-2' /> Resume
                      </button>
                    )}
                    <button
                      className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded"
                      onClick={handleLap}
                    >
                      <FontAwesomeIcon icon={faFlag} className='mr-2'/> Lap
                    </button>
                    <button
                      className="bg-gray-700 hover:bg-gray-600 text-white  py-2 px-4 rounded"
                      onClick={handleReset}
                    >
                      <FontAwesomeIcon icon={faRepeat} className='mr-2'/>Reset
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Second card: 40% width */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full" style={{ flex: '2 1 40%' }}>
           
            <div className="bg-gray-800 p-4 rounded-lg text-white flex-grow ">
              {/* Display lap times in a table */}
              {laps.length === 0 ? (
                <div className='flex items-center justify-center my-40'>
                   <p>No laps recorded</p>
                </div>
               
              ) : (
                <table className="table-auto w-full text-white">
                  <thead>
                    <tr>
                      <th className="text-left pb-2 text-gray-500">Lap</th>
                      <th className="text-left pb-2 text-gray-500">Lap Time</th>
                      <th className="text-left pb-2 text-gray-500">Overall Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laps.map((lap, index) => (
                      <tr key={index}>
                        <td>{lap.lapNumber}</td>
                        <td>{formatTime(lap.lapTime)}</td>
                        <td>{formatTime(lap.overall)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopwatchPage;
