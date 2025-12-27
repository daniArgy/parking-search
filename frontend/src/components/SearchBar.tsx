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
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      maxWidth: 'calc(100% - 360px)',
    }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Buscar dirección en Vigo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '12px 16px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            width: '280px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          Buscar
        </button>
      </form>
      
      <button
        onClick={onGeolocate}
        disabled={isLocating}
        style={{
          padding: '12px 20px',
          backgroundColor: isLocating ? '#9ca3af' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isLocating ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <span>📍</span>
        <span>{isLocating ? 'Ubicando...' : 'Mi ubicación'}</span>
      </button>
    </div>
  );
};

export default SearchBar;
