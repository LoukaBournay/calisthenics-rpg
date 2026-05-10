import { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import TabBar from './components/layout/TabBar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import WorkoutDay from './components/workout/WorkoutDay';
import Progression from './components/progression/Progression';
import StatsPage from './components/stats/StatsPage';
import OnboardingQuiz from './components/onboarding/OnboardingQuiz';

function AppContent() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleOnboardingComplete = ({ profile, adaptations }) => {
    dispatch({ type: 'SET_PROFILE', payload: profile });
    for (const [key, value] of Object.entries(adaptations)) {
      dispatch({
        type: 'SAVE_ADAPTATION',
        payload: { key, ...value },
      });
    }
  };

  if (!state.profile) {
    return (
      <div className="app">
        <OnboardingQuiz onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
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
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
