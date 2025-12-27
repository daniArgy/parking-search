import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Parking } from '../types/Parking';
import { getOccupancyColor } from '../utils/parkingUtils';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  parkings: Parking[];
  selectedParking: Parking | null;
  onParkingSelect: (parking: Parking) => void;
  userLocation: [number, number] | null;
}

// Fix for default marker icon in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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

const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  parkings,
  selectedParking,
  onParkingSelect,
  userLocation
}) => {
  const defaultCenter: [number, number] = [42.2406, -8.7207]; // Vigo center
  const defaultZoom = 13;
  
  const center = selectedParking
    ? [selectedParking.latitud, selectedParking.longitud] as [number, number]
    : userLocation || defaultCenter;

  const zoom = selectedParking ? 16 : defaultZoom;

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
        <MapUpdater center={center} zoom={zoom} />
        
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}

        {parkings.map((parking) => (
          <Marker
            key={parking.id}
            position={[parking.latitud, parking.longitud]}
            icon={createCustomIcon(getOccupancyColor(parking.porcentajeOcupacion))}
            eventHandlers={{
              click: () => onParkingSelect(parking)
            }}
          >
            <Popup>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{parking.nombre}</h3>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Plazas libres:</strong> {parking.plazasLibres} / {parking.plazasTotales}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Ocupación:</strong> {parking.porcentajeOcupacion.toFixed(0)}%
                </p>
                <button
                  onClick={() => onParkingSelect(parking)}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Ver detalles
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
