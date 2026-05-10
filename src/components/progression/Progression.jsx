import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import SkillTree from './SkillTree';
import BossFight from './BossFight';

export default function Progression() {
  const { state } = useGame();
  const [activeBranch, setActiveBranch] = useState('force');

  const branches = [
    { id: 'force', label: 'Force', color: 'var(--accent-red)' },
    { id: 'equilibre', label: 'Équilibre', color: 'var(--accent-cyan)' },
    { id: 'endurance', label: 'Endurance', color: 'var(--accent-green)' },
  ];

  return (
    <div>
      <div className="section-title">Arbre de compétences</div>
      {state.skills.points > 0 && (
        <div style={{ fontSize: 13, color: 'var(--accent-gold)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          {state.skills.points} point{state.skills.points > 1 ? 's' : ''} disponible{state.skills.points > 1 ? 's' : ''}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {branches.map(b => (
          <button
            key={b.id}
            onClick={() => setActiveBranch(b.id)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: activeBranch === b.id ? `1px solid ${b.color}` : '1px solid var(--border)',
              background: activeBranch === b.id ? `${b.color}15` : 'var(--bg-card)',
              color: activeBranch === b.id ? b.color : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      <SkillTree branch={activeBranch} />

      <div style={{ marginTop: 24 }}>
        <div className="section-title">Boss de la semaine</div>
        <BossFight />
      </div>
    </div>
  );
}
