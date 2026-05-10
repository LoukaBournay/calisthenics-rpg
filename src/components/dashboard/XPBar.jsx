import { isNearLevelUp } from '../../engine/rewardEscalation';

export default function XPBar({ current, needed, percent }) {
  const near = isNearLevelUp(percent);

  return (
    <div className="progress-bar" style={{ height: 12, marginTop: 8 }}>
      <div
        className={`progress-bar-fill xp ${near ? 'near' : ''}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
