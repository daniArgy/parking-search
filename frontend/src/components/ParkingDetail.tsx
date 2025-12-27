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

  const statusColor = getOccupancyColor(parking.porcentajeOcupacion);

  return (
    <div className="glass-panel animate-slide-in-right" style={{
      position: 'absolute',
      top: '24px',
      right: '24px',
      width: '360px',
      padding: '28px',
      zIndex: 1100,
      maxHeight: 'calc(100vh - 48px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 700, lineHeight: 1.2 }}>
            {parking.nombre}
          </h2>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📍</span>
            {parking.direccion || 'Vigo, España'}
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn-premium"
          style={{
            background: 'rgba(0,0,0,0.05)',
            color: 'var(--text-main)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            padding: 0,
            fontSize: '20px'
          }}
        >
          ×
        </button>
      </div>

      <div style={{ 
        background: `linear-gradient(135deg, ${statusColor} 0%, ${statusColor}dd 100%)`,
        padding: '24px',
        borderRadius: '16px',
        color: 'white',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: `0 12px 24px -6px ${statusColor}66`
      }}>
        <div style={{ fontSize: '14px', fontWeight: 600, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          {getOccupancyLabel(parking.porcentajeOcupacion)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '48px', fontWeight: 800 }}>{parking.porcentajeOcupacion.toFixed(0)}</span>
          <span style={{ fontSize: '20px', fontWeight: 600, opacity: 0.8 }}>% de ocupación</span>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.4)', 
          padding: '16px', 
          borderRadius: '12px',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Libres</div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>{parking.plazasLibres}</div>
        </div>
        <div style={{ 
          background: 'rgba(255,255,255,0.4)', 
          padding: '16px', 
          borderRadius: '12px',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Totales</div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>{parking.plazasTotales}</div>
        </div>
      </div>

      <button
        onClick={handleGetDirections}
        className="btn-premium"
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: 'white',
          fontSize: '16px',
        }}
      >
        <span>🗺️</span>
        <span>Abrir en Google Maps</span>
      </button>

      <div style={{ marginTop: 'auto', paddingTop: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', opacity: 0.7 }}>
          Datos actualizados cada 5 minutos
        </p>
      </div>
    </div>
  );
};

export default ParkingDetail;
