export default function HistoryLog({ workouts }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const monthName = now.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'capitalize' }}>
        {monthName}
      </div>
      <div className="calendar-grid">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
          <div key={i} style={{ fontSize: 10, color: 'var(--text-dim)', marginBottom: 4 }}>{d}</div>
        ))}
        {days.map((day, i) => {
          if (day === null) return <div key={i} />;

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isToday = day === now.getDate();
          const hasDone = !!workouts[dateStr];
          const dayOfWeek = new Date(year, month, day).getDay();
          const isRestDay = dayOfWeek === 0 || dayOfWeek === 3;
          const isPast = day < now.getDate();

          let className = 'calendar-day';
          if (isToday) className += ' today';
          if (hasDone) className += ' done';
          else if (isRestDay && isPast) className += ' rest';
          else if (isPast && !isRestDay) className += ' missed';

          return (
            <div key={i} className={className}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
