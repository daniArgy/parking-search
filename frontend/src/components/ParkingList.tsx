import React from 'react';
import { Parking } from '../types/Parking';
import { getOccupancyColor } from '../utils/parkingUtils';

interface ParkingListProps {
  parkings: Parking[];
  onParkingSelect: (parking: Parking) => void;
  selectedParking: Parking | null;
}

const ParkingList: React.FC<ParkingListProps> = ({ parkings, onParkingSelect, selectedParking }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto collapse on small screens initially
      if (mobile) setIsCollapsed(true);
      else setIsCollapsed(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const containerStyle: React.CSSProperties = isMobile ? {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    maxHeight: isCollapsed ? '70px' : '60vh',
    borderRadius: '24px 24px 0 0',
    padding: '12px 20px 30px 20px',
    zIndex: 1000,
    overflow: 'hidden',
  } : {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    padding: '20px',
    width: '340px',
    maxHeight: '400px',
    zIndex: 1000,
  };

  return (
    <div className="glass-panel animate-slide-up content-transition" style={{
      display: 'flex',
      flexDirection: 'column',
      ...containerStyle
    }}>
      {/* Drag Handle / Toggle for Mobile */}
      {isMobile && (
        <div 
          onClick={toggleCollapse}
          style={{
            width: '40px',
            height: '4px',
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '2px',
            margin: '0 auto 12px auto',
            cursor: 'pointer'
          }}
        />
      )}

      <div 
        onClick={isMobile ? toggleCollapse : undefined}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px',
          cursor: isMobile ? 'pointer' : 'default'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🅿️</span>
          Parkings en Vigo
          {isMobile && <span style={{ fontSize: '12px', opacity: 0.5 }}>{isCollapsed ? '↑' : '↓'}</span>}
        </h3>
        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', background: 'rgba(0,0,0,0.05)', borderRadius: '20px', color: 'var(--text-muted)' }}>
          {parkings.length}
        </span>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        overflowY: 'auto',
        paddingRight: '4px',
        marginRight: '-4px',
        opacity: isCollapsed && isMobile ? 0 : 1,
        pointerEvents: isCollapsed && isMobile ? 'none' : 'auto',
        transition: 'opacity 0.2s ease'
      }}>
        {parkings.map((parking) => (
          <div
            key={parking.id}
            onClick={() => {
              onParkingSelect(parking);
              if (isMobile) setIsCollapsed(true);
            }}
            style={{
              padding: '12px',
              border: '1px solid ' + (selectedParking?.id === parking.id ? 'var(--primary)' : 'rgba(0,0,0,0.03)'),
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: selectedParking?.id === parking.id ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getOccupancyColor(parking.porcentajeOcupacion),
                boxShadow: `0 0 10px ${getOccupancyColor(parking.porcentajeOcupacion)}44`,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                {parking.nombre}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{parking.plazasLibres} libres</span>
                <span style={{ fontWeight: 700, color: getOccupancyColor(parking.porcentajeOcupacion) }}>
                  {parking.porcentajeOcupacion.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingList;
