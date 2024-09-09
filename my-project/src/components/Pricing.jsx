import React from 'react';

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
          <span><h3 className="text-xl font-bold mb-2">Personal</h3>
          <button className="bg-yellow-500 text-black p-3 rounded-md">
        Sign up
      </button>
          </span>
          <p className="text-sm">
            Free
          </p>
        </div>

        {/* Premium Plan Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
          <div className="text-center mb-4">
            <i className="fas fa-star text-blue-500 text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
          <p className="text-sm">
            All features included with priority support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
