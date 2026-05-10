export default function StatRadar({ stats }) {
  const max = Math.max(stats.force, stats.equilibre, stats.endurance, 50);
  const scale = (v) => (v / max) * 80;

  const cx = 100, cy = 100;
  const angles = [-Math.PI / 2, Math.PI / 6 + Math.PI / 2, Math.PI / 6 - Math.PI / 2 + Math.PI];

  const points = [
    { val: stats.force, color: '#ef4444' },
    { val: stats.equilibre, color: '#06b6d4' },
    { val: stats.endurance, color: '#22c55e' },
  ];

  const coords = points.map((p, i) => ({
    x: cx + Math.cos(angles[i]) * scale(p.val),
    y: cy + Math.sin(angles[i]) * scale(p.val),
  }));

  const bgCoords = [0, 1, 2].map(i => ({
    x: cx + Math.cos(angles[i]) * 80,
    y: cy + Math.sin(angles[i]) * 80,
  }));

  return (
    <div className="radar-container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <polygon
          points={bgCoords.map(c => `${c.x},${c.y}`).join(' ')}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <polygon
          points={[0, 1, 2].map(i => {
            const mid = 40;
            return `${cx + Math.cos(angles[i]) * mid},${cy + Math.sin(angles[i]) * mid}`;
          }).join(' ')}
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="3"
        />
        <polygon
          points={coords.map(c => `${c.x},${c.y}`).join(' ')}
          fill="rgba(168, 85, 247, 0.15)"
          stroke="var(--accent-xp)"
          strokeWidth="2"
        />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="4" fill={points[i].color} />
        ))}
      </svg>
    </div>
  );
}
