import { useState } from 'react';
import { GameProvider } from './context/GameContext';
import TabBar from './components/layout/TabBar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import WorkoutDay from './components/workout/WorkoutDay';
import Progression from './components/progression/Progression';
import StatsPage from './components/stats/StatsPage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <GameProvider>
      <div className="app">
        <Header />
        <div className="tab-content">
          {activeTab === 'dashboard' && <Dashboard onStartWorkout={() => setActiveTab('workout')} />}
          {activeTab === 'workout' && <WorkoutDay />}
          {activeTab === 'progression' && <Progression />}
          {activeTab === 'stats' && <StatsPage />}
        </div>
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>
    </GameProvider>
  );
}

export default App;
