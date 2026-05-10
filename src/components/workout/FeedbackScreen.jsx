import { useState } from 'react';
import { RPE_LABELS, getAdaptiveRecommendation } from '../../engine/adaptiveEngine';

export default function FeedbackScreen({ exercises, onSubmit }) {
  const [feedbackData, setFeedbackData] = useState({});
  const [globalRPE, setGlobalRPE] = useState(null);
  const [step, setStep] = useState('global');

  const handleGlobalRPE = (rpe) => {
    setGlobalRPE(rpe);
    const initial = {};
    exercises.forEach(ex => {
      if (ex.type !== 'check') {
        initial[ex.id] = { rpe, setsCompleted: ex.setsCompleted };
      }
    });
    setFeedbackData(initial);
    setStep('detail');
  };

  const handleExerciseRPE = (exId, rpe, setsCompleted) => {
    setFeedbackData(prev => ({
      ...prev,
      [exId]: { rpe, setsCompleted },
    }));
  };

  const recommendation = globalRPE ? getAdaptiveRecommendation(globalRPE) : null;

  if (step === 'global') {
    return (
      <div style={{ padding: '24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>💬</div>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 20, marginBottom: 4 }}>
            Comment c'était ?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            Ton ressenti global pour cette séance
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {RPE_LABELS.map(rpe => (
            <button
              key={rpe.value}
              onClick={() => handleGlobalRPE(rpe.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 15,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 28 }}>{rpe.emoji}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>{rpe.label}</div>
              </div>
              <div style={{ marginLeft: 'auto', width: 32, height: 32, borderRadius: '50%', background: `${rpe.color}20`, border: `2px solid ${rpe.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, color: rpe.color, fontWeight: 700 }}>
                {rpe.value}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 28, marginBottom: 4 }}>{recommendation?.emoji}</div>
        <div style={{ color: recommendation?.color, fontSize: 14, fontWeight: 600 }}>
          {recommendation?.text}
        </div>
      </div>

      <div className="section-title" style={{ marginBottom: 12 }}>Ajuste par exercice</div>
      <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>
        Tu peux affiner le RPE pour chaque exercice individuellement
      </p>

      {exercises.filter(ex => ex.type !== 'check').map(ex => {
        const currentRPE = feedbackData[ex.id]?.rpe || globalRPE;
        return (
          <div key={ex.id} className="card" style={{ padding: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{ex.name}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {RPE_LABELS.map(rpe => (
                <button
                  key={rpe.value}
                  onClick={() => handleExerciseRPE(ex.id, rpe.value, ex.setsCompleted)}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: 'var(--radius-sm)',
                    border: currentRPE === rpe.value ? `2px solid ${rpe.color}` : '1px solid var(--border)',
                    background: currentRPE === rpe.value ? `${rpe.color}15` : 'var(--bg-input)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{rpe.emoji}</span>
                  <span style={{ fontSize: 9, color: currentRPE === rpe.value ? rpe.color : 'var(--text-dim)' }}>
                    {rpe.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <button
        className="btn-primary"
        onClick={() => onSubmit(feedbackData)}
        style={{ marginTop: 16 }}
      >
        Adapter mon programme
      </button>
    </div>
  );
}
