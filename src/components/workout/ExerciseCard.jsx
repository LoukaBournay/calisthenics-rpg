export default function ExerciseCard({ exercise, onSetComplete }) {
  const allDone = exercise.setsCompleted.every(Boolean);
  const typeLabel = exercise.type === 'seconds' ? 's' : exercise.type === 'check' ? '' : ' reps';

  return (
    <div className={`exercise-card ${allDone ? 'completed' : ''}`}>
      <div className="exercise-name">{exercise.name}</div>
      <div className="exercise-note">
        {exercise.note}
        {exercise.type !== 'check' && (
          <span style={{ marginLeft: 8, color: 'var(--text-dim)' }}>
            {exercise.sets}×{exercise.reps}{typeLabel}
          </span>
        )}
      </div>
      <div className="sets-row">
        {exercise.setsCompleted.map((done, i) => (
          <div
            key={i}
            className={`set-dot ${done ? 'completed' : ''}`}
            onClick={() => onSetComplete(i)}
          />
        ))}
        {allDone && (
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--accent-green)', fontWeight: 600 }}>
            Parfait!
          </span>
        )}
      </div>
    </div>
  );
}
