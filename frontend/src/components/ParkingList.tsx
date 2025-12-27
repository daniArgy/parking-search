import React from 'react';
import { Parking } from '../types/Parking';
import { getOccupancyColor } from '../utils/parkingUtils';

interface ParkingListProps {
  parkings: Parking[];
  onParkingSelect: (parking: Parking) => void;
  selectedParking: Parking | null;
}

const ParkingList: React.FC<ParkingListProps> = ({ parkings, onParkingSelect, selectedParking }) => {
  return (
    <div className="glass-panel animate-slide-up" style={{
      position: 'absolute',
      bottom: '24px',
      left: '24px',
      padding: '20px',
      width: '340px',
      maxHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
          Parkings en Vigo
        </h3>
        <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 8px', background: 'rgba(0,0,0,0.05)', borderRadius: '20px', color: 'var(--text-muted)' }}>
          {parkings.length} encontrados
        </span>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        overflowY: 'auto',
        paddingRight: '4px',
        marginRight: '-4px'
      }}>
        {parkings.map((parking) => (
          <div
            key={parking.id}
            onClick={() => onParkingSelect(parking)}
            style={{
              padding: '12px',
              border: '1px solid ' + (selectedParking?.id === parking.id ? 'var(--primary)' : 'rgba(0,0,0,0.05)'),
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: selectedParking?.id === parking.id ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
              transform: selectedParking?.id === parking.id ? 'scale(1.02)' : 'scale(1)',
              boxShadow: selectedParking?.id === parking.id ? '0 4px 12px rgba(99, 102, 241, 0.1)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedParking?.id !== parking.id) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedParking?.id !== parking.id) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getOccupancyColor(parking.porcentajeOcupacion),
                boxShadow: `0 0 10px ${getOccupancyColor(parking.porcentajeOcupacion)}88`,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                {parking.nombre}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{parking.plazasLibres} disponibles</span>
                <span style={{ fontWeight: 600, color: getOccupancyColor(parking.porcentajeOcupacion) }}>
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
