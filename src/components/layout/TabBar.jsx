const TABS = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'workout', icon: '⚡', label: 'Programme' },
  { id: 'progression', icon: '🌳', label: 'Progression' },
  { id: 'stats', icon: '📊', label: 'Stats' },
];

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tab-bar">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
