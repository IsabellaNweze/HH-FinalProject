import React from 'react';
import Hero from './components/Hero';
import Homecards from './components/Homecards'
import Listings from './components/Listings'
import Pricing from './components/Pricing'

const App = () => {
  return (
    <div className="bg-black min-h-screen ">
    
      <Hero />
      <Homecards/>
      <Listings/>
      <Pricing/>
    </div>
  );
};

export default App;
