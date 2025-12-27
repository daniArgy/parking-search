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
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      maxWidth: '320px',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 1000,
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
        Parkings disponibles ({parkings.length})
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {parkings.slice(0, 5).map((parking) => (
          <div
            key={parking.id}
            onClick={() => onParkingSelect(parking)}
            style={{
              padding: '8px',
              border: selectedParking?.id === parking.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: selectedParking?.id === parking.id ? '#eff6ff' : 'white',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getOccupancyColor(parking.porcentajeOcupacion),
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {parking.nombre}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {parking.plazasLibres} libres de {parking.plazasTotales}
              </div>
            </div>
          </div>
        ))}
        {parkings.length > 5 && (
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '4px' }}>
            +{parkings.length - 5} más
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingList;
