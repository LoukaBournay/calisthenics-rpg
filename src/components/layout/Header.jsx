import { useGame } from '../../context/GameContext';
import { getXPProgress } from '../../engine/levelSystem';

export default function Header() {
  const { state } = useGame();
  const progress = getXPProgress(state.player.totalXP);

  return (
    <div className="header">
      <div className="level-badge">
        <span className="level-num">LVL {progress.level}</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{state.player.title}</span>
      </div>
      <div className="streak-display">
        <span className="streak-flame">🔥</span>
        <span>{state.streak.current}</span>
      </div>
    </div>
  );
}
