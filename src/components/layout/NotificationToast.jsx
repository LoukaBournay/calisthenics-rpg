import { useEffect, useState } from 'react';

export default function NotificationToast({ message, type = 'default', duration = 3000, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDone]);

  if (!visible) return null;

  return (
    <div className={`notification-toast ${type === 'drop' ? 'drop-notification' : ''}`}>
      {message}
    </div>
  );
}
