import React, { useState } from 'react';

interface SearchBarProps {
  onGeolocate: () => void;
  onSearch: (query: string) => void;
  isLocating: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onGeolocate, onSearch, isLocating }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="glass-panel animate-slide-up" style={{
      position: 'absolute',
      top: '24px',
      left: '24px',
      zIndex: 1000,
      display: 'flex',
      gap: '12px',
      padding: '12px',
      flexWrap: 'wrap',
      maxWidth: 'calc(100% - 48px)',
    }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flex: 1 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar dirección en Vigo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '12px 16px 12px 42px',
              fontSize: '15px',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '12px',
              width: '100%',
              minWidth: '240px',
              backgroundColor: 'rgba(255,255,255,0.5)',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.backgroundColor = 'white'}
            onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.5)'}
          />
        </div>
        <button
          type="submit"
          className="btn-premium"
          style={{
            padding: '0 24px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: 'white',
          }}
        >
          Buscar
        </button>
      </form>
      
      <button
        onClick={onGeolocate}
        disabled={isLocating}
        className="btn-premium"
        style={{
          padding: '0 24px',
          background: isLocating ? '#9ca3af' : 'linear-gradient(135deg, var(--secondary) 0%, #059669 100%)',
          color: 'white',
          cursor: isLocating ? 'not-allowed' : 'pointer',
        }}
      >
        <span>{isLocating ? '⌛' : '📍'}</span>
        <span style={{ display: 'inline-block' }}>{isLocating ? 'Ubicando...' : 'Mi ubicación'}</span>
      </button>
    </div>
  );
};

export default SearchBar;
