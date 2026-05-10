import { useState } from 'react';
import { ONBOARDING_QUESTIONS, evaluateProfile, generateProgramFromProfile } from '../../data/onboarding';

export default function OnboardingQuiz({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelected, setMultiSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [profile, setProfile] = useState(null);

  const question = ONBOARDING_QUESTIONS[currentIndex];
  const total = ONBOARDING_QUESTIONS.length;
  const progress = ((currentIndex) / total) * 100;

  const handleSingleSelect = (value) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setMultiSelected([]);
    } else {
      finalize(newAnswers);
    }
  };

  const handleMultiToggle = (value) => {
    if (value === 'none' || value === 'nothing') {
      setMultiSelected([value]);
      return;
    }
    setMultiSelected(prev => {
      const filtered = prev.filter(v => v !== 'none' && v !== 'nothing');
      return filtered.includes(value)
        ? filtered.filter(v => v !== value)
        : [...filtered, value];
    });
  };

  const handleMultiConfirm = () => {
    const selected = multiSelected.length > 0 ? multiSelected : ['none'];
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);

    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setMultiSelected([]);
    } else {
      finalize(newAnswers);
    }
  };

  const finalize = (finalAnswers) => {
    const p = evaluateProfile(finalAnswers);
    setProfile(p);
    setShowResult(true);
  };

  const handleStart = () => {
    const adaptations = generateProgramFromProfile(profile);
    onComplete({ profile, adaptations, answers });
  };

  if (showResult && profile) {
    const levelLabels = {
      debutant: { text: 'Débutant', emoji: '🌱', color: '#22c55e' },
      intermediaire: { text: 'Intermédiaire', emoji: '⚡', color: '#f97316' },
      avance: { text: 'Avancé', emoji: '🔥', color: '#ef4444' },
    };
    const lvl = levelLabels[profile.level];

    return (
      <div style={{ padding: '32px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{lvl.emoji}</div>
        <h2 style={{ color: 'var(--text-primary)', fontSize: 24, marginBottom: 8 }}>
          Profil créé
        </h2>
        <div style={{
          display: 'inline-block',
          padding: '6px 20px',
          borderRadius: 20,
          background: `${lvl.color}20`,
          border: `1px solid ${lvl.color}`,
          color: lvl.color,
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 24,
        }}>
          Niveau {lvl.text}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          <StatCard label="Tirage" value={profile.pullLevel} max={4} color="var(--accent-red)" />
          <StatCard label="Poussée" value={profile.pushLevel} max={4} color="var(--accent-orange)" />
          <StatCard label="Équilibre" value={profile.hsLevel} max={4} color="var(--accent-cyan)" />
          <StatCard label="Gainage" value={profile.coreLevel} max={4} color="var(--accent-green)" />
        </div>

        {profile.goals.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              Objectifs
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[...new Set(profile.goals)].map(g => (
                <span key={g} style={{
                  padding: '4px 12px',
                  borderRadius: 12,
                  background: 'var(--bg-input)',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                }}>
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>
          Ton programme a été adapté à ton niveau. Il évoluera avec toi grâce à l'algorithme adaptatif.
        </p>

        <button className="btn-primary" onClick={handleStart}>
          Commencer l'aventure
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
            {question.category}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {currentIndex + 1}/{total}
          </span>
        </div>
        <div className="progress-bar" style={{ height: 4 }}>
          <div className="progress-bar-fill xp" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ color: 'var(--text-primary)', fontSize: 20, marginBottom: 24, lineHeight: 1.4 }}>
          {question.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {question.options.map(opt => {
            const isSelected = question.type === 'multi'
              ? multiSelected.includes(opt.value)
              : answers[question.id] === opt.value;

            return (
              <button
                key={opt.value}
                onClick={() => question.type === 'multi' ? handleMultiToggle(opt.value) : handleSingleSelect(opt.value)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius)',
                  border: isSelected ? '1px solid var(--accent-xp)' : '1px solid var(--border)',
                  background: isSelected ? 'var(--accent-xp-glow)' : 'var(--bg-card)',
                  color: isSelected ? 'var(--accent-xp)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: 15,
                  textAlign: 'left',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {question.type === 'multi' && (
          <button
            className="btn-primary"
            onClick={handleMultiConfirm}
            style={{ marginTop: 16, opacity: multiSelected.length > 0 ? 1 : 0.5 }}
            disabled={multiSelected.length === 0}
          >
            Valider
          </button>
        )}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={() => { setCurrentIndex(currentIndex - 1); setMultiSelected([]); }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-dim)',
            padding: 12,
            cursor: 'pointer',
            fontSize: 13,
            marginTop: 16,
          }}
        >
          ← Retour
        </button>
      )}
    </div>
  );
}

function StatCard({ label, value, max, color }) {
  const percent = (value / max) * 100;
  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-sm)',
      padding: 12,
      border: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 6 }}>{label}</div>
      <div className="progress-bar" style={{ height: 6 }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          borderRadius: 3,
          background: color,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <div style={{ fontSize: 12, color, fontFamily: 'var(--font-mono)', marginTop: 4 }}>
        {value}/{max}
      </div>
    </div>
  );
}
