import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const color = type === 'error' ? 'var(--danger)' : type === 'success' ? 'var(--secondary)' : 'var(--primary)';
  const icon = type === 'error' ? '🚫' : type === 'success' ? '✨' : 'ℹ️';

  return (
    <div className="glass-panel animate-slide-up" style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '12px 20px',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '90%',
      borderLeft: `4px solid ${color}`,
    }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'rgba(0,0,0,0.05)',
          border: 'none',
          color: 'var(--text-muted)',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
