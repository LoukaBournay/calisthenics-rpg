import { useState, useCallback, useMemo } from 'react';
import { useGame } from '../../context/GameContext';
import { PROGRAM, getTodayKey } from '../../data/program';
import { getStreakMultiplier } from '../../engine/streakEngine';
import { calculateWorkoutXP, calculateStatsGained } from '../../engine/xpCalculator';
import { rollRandomDrop } from '../../engine/rewardEscalation';
import ExerciseCard from './ExerciseCard';
import RestTimer from './RestTimer';
import WorkoutComplete from './WorkoutComplete';
import FeedbackScreen from './FeedbackScreen';
import NotificationToast from '../layout/NotificationToast';

function applyAdaptations(baseExercises, adaptations, dayKey) {
  return baseExercises.map(ex => {
    const key = `${dayKey}_${ex.id}`;
    const adaptation = adaptations[key];
    if (!adaptation) return ex;
    return {
      ...ex,
      reps: adaptation.reps,
      sets: adaptation.sets,
      note: ex.note + (adaptation.lastRPE <= 2 ? ' 📈' : adaptation.lastRPE >= 4 ? ' 🛡️' : ''),
    };
  });
}

export default function WorkoutDay() {
  const { state, dispatch } = useGame();
  const todayKey = getTodayKey();
  const todayProgram = PROGRAM[todayKey];
  const todayDate = new Date().toISOString().split('T')[0];

  const adaptedExercises = useMemo(
    () => applyAdaptations(todayProgram.exercises, state.adaptations || {}, todayKey),
    [todayProgram.exercises, state.adaptations, todayKey]
  );

  const [exercises, setExercises] = useState(
    adaptedExercises.map(ex => ({
      ...ex,
      setsCompleted: new Array(ex.sets).fill(false),
    }))
  );
  const [showTimer, setShowTimer] = useState(false);
  const [phase, setPhase] = useState(state.workouts[todayDate] ? 'done' : 'workout');
  const [result, setResult] = useState(null);
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
    setPhase('feedback');
  };

  const handleFeedbackSubmit = (feedbackData) => {
    dispatch({
      type: 'SAVE_FEEDBACK',
      payload: {
        dayKey: todayKey,
        feedbackData,
        exercises: todayProgram.exercises,
      },
    });
    setPhase('done');
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = exercises.reduce(
    (sum, ex) => sum + ex.setsCompleted.filter(Boolean).length, 0
  );
  const progressPercent = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  if (phase === 'done' && result) {
    return <WorkoutComplete result={result} />;
  }

  if (phase === 'done' && !result) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h2 style={{ color: 'var(--accent-green)', marginBottom: 8 }}>Déjà complété</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Tu as déjà terminé ta séance aujourd'hui. Repose-toi!
        </p>
      </div>
    );
  }

  if (phase === 'feedback') {
    return (
      <div>
        {result && (
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="xp-gained" style={{ fontSize: 28 }}>+{result.totalXP} XP</div>
          </div>
        )}
        <FeedbackScreen exercises={exercises} onSubmit={handleFeedbackSubmit} />
      </div>
    );
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

  const hasAdaptations = Object.keys(state.adaptations || {}).some(k => k.startsWith(todayKey));

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
          {hasAdaptations && (
            <span style={{ fontSize: 11, color: 'var(--accent-cyan)', background: 'var(--accent-cyan)15', padding: '2px 8px', borderRadius: 12 }}>
              Adapté
            </span>
          )}
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
