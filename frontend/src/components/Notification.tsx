import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const backgroundColor = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6';

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor,
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '90%'
    }}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          border: 'none',
          color: 'white',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
