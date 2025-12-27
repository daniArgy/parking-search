import React, { useState } from 'react';

interface SearchBarProps {
  onGeolocate: () => void;
  onSearch: (query: string) => void;
  isLocating: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onGeolocate, onSearch, isLocating }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const spacing = isMobile ? '12px' : '24px';

  return (
    <div className="glass-panel animate-slide-up" style={{
      position: 'absolute',
      top: spacing,
      left: spacing,
      right: spacing,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: isMobile ? '12px' : '16px',
      maxWidth: isMobile ? 'none' : '450px',
    }}>
      <form onSubmit={handleSearch} style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'row' : 'row', 
        gap: '8px', 
        width: '100%' 
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '14px' }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar dirección..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px 12px 10px 36px',
              fontSize: '14px',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '12px',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.5)',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
        <button
          type="submit"
          className="btn-premium"
          style={{
            padding: isMobile ? '0 12px' : '0 20px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: 'white',
            whiteSpace: 'nowrap'
          }}
        >
          {isMobile ? '🔍' : 'Buscar'}
        </button>
      </form>
      
      <button
        onClick={onGeolocate}
        disabled={isLocating}
        className="btn-premium"
        style={{
          width: '100%',
          padding: '8px 16px',
          background: isLocating ? '#9ca3af' : 'linear-gradient(135deg, var(--secondary) 0%, #059669 100%)',
          color: 'white',
          cursor: isLocating ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>{isLocating ? '⌛' : '📍'}</span>
        <span>{isLocating ? 'Ubicando...' : 'Mi ubicación'}</span>
      </button>
    </div>
  );
};

export default SearchBar;
