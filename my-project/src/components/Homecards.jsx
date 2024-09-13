import React from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCalendarAlt, faBell, faClock, faAppleWhole, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Homecards = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 - Timezones */}
        <Link to="/timezone">
          <Card
            logo={<FontAwesomeIcon icon={faGlobe} className="text-white text-4xl" />}
            title="Timezones"
            text="Convert time across different zones."
          />
        </Link>

        {/* Card 2 - Pomodoro */}
        <Link to="/pomodoro">
          <Card
            logo={<FontAwesomeIcon icon={faAppleWhole} className="text-white text-4xl" />}
            title="Pomodoro"
            text="Boost productivity with timed work sessions."
          />
        </Link>

        {/* Card 3 - Daily Planner */}
        <Link to="/planner">
          <Card
            logo={<FontAwesomeIcon icon={faCalendarAlt} className="text-white text-4xl" />}
            title="Daily Planner"
            text="Plan your days and weeks to stay organized."
          />
        </Link>

        {/* Card 4 - World clock */}
        <Link to="/worldclock">
          <Card
            logo={<FontAwesomeIcon icon={faClock} className="text-white text-4xl" />}
            title="World clock"
            text="Check current time anywhere in the world."
          />
        </Link>

        {/* Card 5 - Timer */}
        <Link to="/timer">
          <Card
            logo={<FontAwesomeIcon icon={faBell} className="text-white text-4xl" />}
            title="Timer"
            text="Set countdowns with alarm for any task."
          />
        </Link>

        {/* Card 6 - Stopwatch */}
        <Link to="/stopwatch">
          <Card
            logo={<FontAwesomeIcon icon={faStopwatch} className="text-white text-4xl" />}
            title="Stopwatch"
            text="Measure elapsed time precisely."
          />
        </Link>
      </div>
    </div>
  );
};

export default Homecards;
