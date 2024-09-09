import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Homecards from './components/Homecards';
import Listings from './components/Listings';
import Pricing from './components/Pricing';
import Bottom from './components/Bottom';
import TimezonePage from './components/TimezonePage'; // Add your corresponding pages here
import PomodoroPage from './components/PomodoroPage';
import PlannerPage from './components/PlannerPage';
import WorldClockPage from './components/WorldClockPage';
import TimerPage from './components/TimerPage';
import StopwatchPage from './components/StopwatchPage';

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Homecards />
      <Listings />
      <Pricing />
      <Bottom />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Routes for each module */}
        <Route path="/timezone" element={<TimezonePage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/worldclock" element={<WorldClockPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/stopwatch" element={<StopwatchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
