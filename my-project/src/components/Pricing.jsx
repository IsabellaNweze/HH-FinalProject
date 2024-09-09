import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const featuresBasic = [
  { icon: faCheckCircle, text: "Unlimited Individual Timezones" },
  { icon: faCheckCircle, text: "Team Timezones (up to 3)" },
  { icon: faCheckCircle, text: "1 Workspace and Project" },
  { icon: faCheckCircle, text: "Pomodoro Timer" },
  { icon: faCheckCircle, text: "Daily Planner (7 days history)" },
  { icon: faCheckCircle, text: "7 tasks per day" },
  { icon: faCheckCircle, text: "Focus Sounds" },
  { icon: faCheckCircle, text: "World Clock, Timer, Stopwatch" }
];

const featuresProfessional = [
  { icon: faCheckCircle, text: "All the basic features" },
  { icon: faCheckCircle, text: "Team Timezones (up to 10)" },
  { icon: faCheckCircle, text: "Unlimited Workspaces & Projects" },
  { icon: faCheckCircle, text: "Advanced Pomodoro Timer" },
  { icon: faCheckCircle, text: "Daily Planner (Unlimited History)" },
  { icon: faCheckCircle, text: "Unlimited tasks" },
  { icon: faCheckCircle, text: "Early access to new features" },
  { icon: faCheckCircle, text: "Support the development" }
];

const Pricing = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header with Lines */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t-2 border-yellow-500 mx-4" />
          <h2 className="text-2xl font-bold">Pricing</h2>
          <hr className="flex-grow border-t-2 border-yellow-500 mx-4" />
        </div>
        {/* Additional Text Below Header */}
        <p className="text-center text-sm mb-8 max-w-md text-gray-500">
          Keep using the app for free. Upgrade anytime to support the development, and unlock additional features.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Basic Plan Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
          <div className="text-center mb-4">
            <i className="fas fa-crown text-yellow-500 text-3xl"></i>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Personal</h3>
            <button className="bg-yellow-500 text-black p-2 rounded-lg text-sm">
              Sign Up
            </button>
          </div>
          <p className="text-sm mb-4 text-gray-400">
            All the basic features to help you manage your time and stay productive.
          </p>
          <p className="text-sm mb-4">Free</p>
          {/* Features List */}
          <ul className="list-none pl-0">
            {featuresBasic.map((feature, index) => (
              <li key={index} className="flex items-center mb-2 text-sm">
                <FontAwesomeIcon icon={feature.icon} className="text-green-500 mr-2" />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Professional Plan Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
          <div className="text-center mb-4">
            <i className="fas fa-star text-blue-500 text-3xl"></i>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Professional</h3>
            <button className="bg-yellow-500 text-black p-2 rounded-lg text-sm">
              Sign Up
            </button>
          </div>
          <p className="text-lg ">
                    <span className="line-through text-gray-400">$9.99</span> <span className="text-sm">$5.99/mo</span>
            </p>

          <p className="text-sm mb-4 text-gray-400">
            Unlock advanced features and support the development of the app.
          </p>
          {/* Features List */}
          <ul className="list-none pl-0 mb-4">
            {featuresProfessional.map((feature, index) => (
              <li key={index} className="flex items-center mb-2 text-sm">
                <FontAwesomeIcon icon={feature.icon} className="text-green-500 mr-2" />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
