import { useState, useEffect } from 'react';

export default function RestTimer({ duration = 90, onDone }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDone();
      return;
    }
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onDone]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="card rest-timer">
      <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>
        Repos
      </div>
      <div className="rest-timer-value">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <button
        onClick={onDone}
        style={{
          background: 'none',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          padding: '8px 20px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        Skip
      </button>
    </div>
  );
}
