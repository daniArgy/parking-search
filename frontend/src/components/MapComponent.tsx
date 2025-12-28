import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Parking } from '../types/Parking';
import { getOccupancyColor, getOccupancyLabel } from '../utils/parkingUtils';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  parkings: Parking[];
  selectedParking: Parking | null;
  onParkingSelect: (parking: Parking) => void;
  onMapMoveStateChange?: (isMoving: boolean) => void;
  userLocation: [number, number] | null;
  searchLocation: [number, number] | null;
}

// Fix for default marker icon in Leaflet with React
// This needs to be done once, but it's safe here
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
}

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const MapHandler: React.FC<{ 
  center: [number, number]; 
  zoom: number;
  onMoveChange?: (isMoving: boolean) => void;
}> = ({ center, zoom, onMoveChange }) => {
  const map = useMap();
  
  useEffect(() => {
    // Only set view if center or zoom references change (which now only happens on intent)
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);

  useMapEvents({
    movestart: () => onMoveChange?.(true),
    moveend: () => onMoveChange?.(false),
  });

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  parkings,
  selectedParking,
  onParkingSelect,
  onMapMoveStateChange,
  userLocation,
  searchLocation
}) => {
  const defaultCenter: [number, number] = [42.2406, -8.7207]; // Vigo center
  const defaultZoom = 13;
  const markerRefs = React.useRef<{ [key: string]: L.Marker | null }>({});
  
  const handleGetDirections = (parking: Parking) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${parking.latitud},${parking.longitud}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (selectedParking && markerRefs.current[selectedParking.id]) {
      const marker = markerRefs.current[selectedParking.id];
      if (marker) {
        // Small timeout to allow MapHandler to finish panning/zooming
        setTimeout(() => {
          marker.openPopup();
        }, 100);
      }
    }
  }, [selectedParking]);

  const center = React.useMemo<[number, number]>(() => {
    if (selectedParking) return [selectedParking.latitud, selectedParking.longitud];
    if (searchLocation) return searchLocation;
    if (userLocation) return userLocation;
    return defaultCenter;
  }, [selectedParking, searchLocation, userLocation]);

  const zoom = React.useMemo(() => {
    if (selectedParking || searchLocation || userLocation) return 16;
    return defaultZoom;
  }, [selectedParking, searchLocation, userLocation]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapHandler center={center} zoom={zoom} onMoveChange={onMapMoveStateChange} />
        
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}

        {parkings.map((parking) => {
          const statusColor = getOccupancyColor(parking.porcentajeOcupacion);
          return (
            <Marker
              key={parking.id}
              ref={(ref: L.Marker | null) => {
                markerRefs.current[parking.id] = ref;
              }}
              position={[parking.latitud, parking.longitud]}
              icon={createCustomIcon(statusColor)}
              eventHandlers={{
                click: () => onParkingSelect(parking)
              }}
            >
              <Popup maxWidth={280} minWidth={240}>
                <div style={{ padding: '4px', fontFamily: '"Outfit", sans-serif' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700 }}>{parking.nombre}</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>📍</span> {parking.direccion || 'Vigo, España'}
                  </p>
                  
                  <div style={{ 
                    background: `linear-gradient(135deg, ${statusColor} 0%, ${statusColor}dd 100%)`,
                    padding: '12px',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '12px',
                    boxShadow: `0 4px 12px ${statusColor}44`
                  }}>
                    <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                      {getOccupancyLabel(parking.porcentajeOcupacion)}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800 }}>{parking.porcentajeOcupacion.toFixed(0)}%</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.03)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Libres</div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{parking.plazasLibres}</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.03)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Totales</div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{parking.plazasTotales}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGetDirections(parking)}
                    className="btn-premium"
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      color: 'white',
                      fontSize: '13px',
                      borderRadius: '10px'
                    }}
                  >
                    <span>🗺️</span>
                    <span>Cómo llegar</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
