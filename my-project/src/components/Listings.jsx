import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCalendarAlt, faStopwatch, faClock, faBell, faPlus } from '@fortawesome/free-solid-svg-icons';

const Listings = () => {
  const items = [
    {
      icon: faGlobe,
      header: "Timezones for Teams and Individuals",
      text: "Compare timezones globally. Save favorites. Collaborate with team members. DST-aware."
    },
    {
      icon: faCalendarAlt,
      header: "Support for Workspaces and Projects",
      text: "Organize your tasks and projects in workspaces. Use Pomodoros and Daily Planner on your tasks."
    },
    {
      icon: faBell,
      header: "Stay productive with Pomodoros",
      text: "Customizable work/break intervals. Track productivity. Notifications and alerts."
    },
    {
      icon: faClock,
      header: "Plan your days with daily planner",
      text: "Manage tasks and schedules. Recurring tasks. Quick entry. Pomodoro integration."
    },
    {
      icon: faStopwatch,
      header: "Timer to set countdowns and alarms",
      text: "Set countdowns for any activity. Sound alerts and notifications."
    },
    {
      icon: faStopwatch,
      header: "Stopwatch to track activities",
      text: "Track elapsed time. Start, stop, and reset functionality."
    },
    {
      icon: faPlus,
      header: "More tools coming soon",
      text: "Additional time and productivity tools in development."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-8">
      <ol className="list-decimal pl-6 ">
        {items.map((item, index) => (
          <li key={index} className="flex items-start mb-4">
            <FontAwesomeIcon icon={item.icon} className="text-white text-2xl mr-4" />
            <div>
              <div className="font-bold text-lg">{item.header}</div>
              <div className="text-sm text-gray-500">{item.text}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Listings;
