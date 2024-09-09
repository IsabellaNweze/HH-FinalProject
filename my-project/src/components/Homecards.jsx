import React from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCalendarAlt, faBell, faClock, faAppleWhole, faStopwatch } from '@fortawesome/free-solid-svg-icons';

const Homecards = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <Card
          logo={<FontAwesomeIcon icon={faGlobe} className="text-yellow-500 text-4xl" />}
          title="Timezones"
          text="Convert time across different zones."
        />

        {/* Card 2 */}
        <Card
          logo={<FontAwesomeIcon icon={faAppleWhole} className="text-blue-500 text-4xl" />}
          title="Pomodoro"
          text="Boost productivity with timed work sessions."
        />

        {/* Card 3 */}
        <Card
          logo={<FontAwesomeIcon icon={faCalendarAlt} className="text-red-500 text-4xl" />}
          title="Daily Planner"
          text="Plan your days and weeks to stay organized."
        />

        {/* Card 4 */}
        <Card
          logo={<FontAwesomeIcon icon={faClock} className="text-green-500 text-4xl" />}
          title="World clock"
          text="Check current time anywhere in the world."
        />

        {/* Card 5 */}
        <Card
          logo={<FontAwesomeIcon icon={faBell} className="text-purple-500 text-4xl" />}
          title="Timer"
          text="Set coutdowns with alarm for any task."
        />

        {/* Card 6 */}
        <Card
          logo={<FontAwesomeIcon icon={faStopwatch} className="text-orange-500 text-4xl" />}
          title="Stopwatch"
          text="Measure elapsed time precisely."
        />
      </div>
    </div>
  );
};

export default Homecards;
