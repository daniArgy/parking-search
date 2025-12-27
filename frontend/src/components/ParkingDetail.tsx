import React from 'react';
import { Parking } from '../types/Parking';
import { getOccupancyColor, getOccupancyLabel } from '../utils/parkingUtils';

interface ParkingDetailProps {
  parking: Parking | null;
  onClose: () => void;
}

const ParkingDetail: React.FC<ParkingDetailProps> = ({ parking, onClose }) => {
  if (!parking) return null;

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${parking.latitud},${parking.longitud}`;
    window.open(url, '_blank');
  };

  const color = getOccupancyColor(parking.porcentajeOcupacion);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '320px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      zIndex: 1000,
      maxHeight: 'calc(100vh - 40px)',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>{parking.nombre}</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{
          padding: '12px',
          borderRadius: '6px',
          backgroundColor: color,
          color: 'white',
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>{getOccupancyLabel(parking.porcentajeOcupacion)}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{parking.porcentajeOcupacion.toFixed(0)}%</div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: '8px 0', fontSize: '14px' }}>
            <strong>Plazas libres:</strong> {parking.plazasLibres}
          </p>
          <p style={{ margin: '8px 0', fontSize: '14px' }}>
            <strong>Total de plazas:</strong> {parking.plazasTotales}
          </p>
          <p style={{ margin: '8px 0', fontSize: '14px' }}>
            <strong>Dirección:</strong> {parking.direccion || 'No disponible'}
          </p>
        </div>
      </div>

      <button
        onClick={handleGetDirections}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <span>🗺️</span>
        <span>Cómo llegar</span>
      </button>
    </div>
  );
};

export default ParkingDetail;
