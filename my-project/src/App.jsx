import React from 'react';
import Hero from './components/Hero';
import Homecards from './components/Homecards'
import Listings from './components/Listings'
import Pricing from './components/Pricing'
import Bottom from './components/Bottom'

const App = () => {
  return (
    <div className="bg-black min-h-screen ">
    
      <Hero />
      <Homecards/>
      <Listings/>
      <Pricing/>
      <Bottom/>
    </div>
  );
};

export default App;
