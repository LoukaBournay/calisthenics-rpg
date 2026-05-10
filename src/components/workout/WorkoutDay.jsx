import { useState, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { PROGRAM, getTodayKey } from '../../data/program';
import { getStreakMultiplier } from '../../engine/streakEngine';
import { calculateWorkoutXP, calculateStatsGained } from '../../engine/xpCalculator';
import { rollRandomDrop } from '../../engine/rewardEscalation';
import ExerciseCard from './ExerciseCard';
import RestTimer from './RestTimer';
import WorkoutComplete from './WorkoutComplete';
import NotificationToast from '../layout/NotificationToast';

export default function WorkoutDay() {
  const { state, dispatch } = useGame();
  const todayKey = getTodayKey();
  const todayProgram = PROGRAM[todayKey];
  const todayDate = new Date().toISOString().split('T')[0];

  const [exercises, setExercises] = useState(
    todayProgram.exercises.map(ex => ({
      ...ex,
      setsCompleted: new Array(ex.sets).fill(false),
    }))
  );
  const [showTimer, setShowTimer] = useState(false);
  const [completed, setCompleted] = useState(!!state.workouts[todayDate]);
  const [result, setResult] = useState(null);
  const [drop, setDrop] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleSetComplete = useCallback((exIndex, setIndex) => {
    setExercises(prev => {
      const updated = [...prev];
      const ex = { ...updated[exIndex] };
      ex.setsCompleted = [...ex.setsCompleted];
      ex.setsCompleted[setIndex] = !ex.setsCompleted[setIndex];
      updated[exIndex] = ex;
      return updated;
    });

    setShowTimer(true);

    const randomDrop = rollRandomDrop();
    if (randomDrop) {
      setDrop(randomDrop);
      dispatch({ type: 'ADD_INVENTORY', payload: randomDrop });
      setNotification(`${randomDrop.icon} ${randomDrop.name} — ${randomDrop.effect}`);
    }
  }, [dispatch]);

  const handleFinishWorkout = () => {
    const multiplier = getStreakMultiplier(state.streak.current);
    const totalXP = calculateWorkoutXP(exercises, multiplier);
    const statsGained = calculateStatsGained(exercises);

    dispatch({
      type: 'COMPLETE_WORKOUT',
      payload: { dayKey: todayKey, exercises, date: todayDate },
    });

    setResult({ totalXP, statsGained });
    setCompleted(true);
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = exercises.reduce(
    (sum, ex) => sum + ex.setsCompleted.filter(Boolean).length, 0
  );
  const progressPercent = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  if (completed && result) {
    return <WorkoutComplete result={result} />;
  }

  if (todayProgram.exercises.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{todayProgram.icon}</div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{todayProgram.name}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          La progression se fait pendant le repos. Mange bien, dors bien.
        </p>
      </div>
    );
  }

  return (
    <div>
      {notification && (
        <NotificationToast
          message={notification}
          type="drop"
          onDone={() => setNotification(null)}
        />
      )}

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>{todayProgram.icon}</span>
          <span style={{ fontWeight: 700, fontSize: 18 }}>{todayProgram.name}</span>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-bar-fill xp ${progressPercent >= 85 ? 'near' : ''}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, textAlign: 'right' }}>
          {completedSets}/{totalSets} sets — {Math.round(progressPercent)}%
        </div>
      </div>

      {todayProgram.warmup && (
        <div className="card" style={{ borderColor: 'var(--accent-cyan)', opacity: 0.7 }}>
          <div style={{ fontSize: 12, color: 'var(--accent-cyan)', marginBottom: 4 }}>Échauffement · {todayProgram.warmup.duration}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{todayProgram.warmup.description}</div>
        </div>
      )}

      {exercises.map((ex, i) => (
        <ExerciseCard
          key={ex.id + i}
          exercise={ex}
          onSetComplete={(setIdx) => handleSetComplete(i, setIdx)}
        />
      ))}

      {showTimer && (
        <RestTimer onDone={() => setShowTimer(false)} />
      )}

      {completedSets > 0 && (
        <button
          className="btn-primary"
          onClick={handleFinishWorkout}
          style={{ marginTop: 16 }}
        >
          {completedSets === totalSets ? '🏆 Terminer — Workout Parfait!' : 'Terminer le workout'}
        </button>
      )}
    </div>
  );
}
