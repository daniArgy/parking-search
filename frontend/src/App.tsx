import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import SearchBar from './components/SearchBar';
import ParkingDetail from './components/ParkingDetail';
import ParkingList from './components/ParkingList';
import Notification from './components/Notification';
import { parkingService } from './services/parkingService';
import { Parking } from './types/Parking';
import './App.css';

function App() {
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    loadParkings();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadParkings = async () => {
    setLoading(true);
    const data = await parkingService.getAllParkings();
    setParkings(data);
    setLoading(false);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setNotification({ message: 'La geolocalización no está soportada por tu navegador', type: 'error' });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setNotification({ message: 'Ubicación obtenida correctamente', type: 'success' });
        setIsLocating(false);
      },
      (error) => {
        console.error('Error al obtener ubicación:', error);
        setNotification({ message: 'No se pudo obtener tu ubicación. Por favor, permite el acceso a la ubicación.', type: 'error' });
        setIsLocating(false);
      }
    );
  };

  const handleSearch = async (query: string) => {
    // Simple search implementation - filter parkings by name
    const filtered = parkings.filter(p => 
      p.nombre.toLowerCase().includes(query.toLowerCase()) ||
      p.direccion.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length > 0) {
      setSelectedParking(filtered[0]);
      setNotification({ message: `Encontrado: ${filtered[0].nombre}`, type: 'success' });
    } else {
      setNotification({ message: 'No se encontraron parkings con ese criterio de búsqueda', type: 'info' });
    }
  };

  return (
    <div className="App" style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          fontSize: '20px',
          color: '#666'
        }}>
          Cargando parkings...
        </div>
      ) : (
        <>
          <MapComponent
            parkings={parkings}
            selectedParking={selectedParking}
            onParkingSelect={setSelectedParking}
            userLocation={userLocation}
          />
          <SearchBar
            onGeolocate={handleGeolocate}
            onSearch={handleSearch}
            isLocating={isLocating}
          />
          <ParkingList
            parkings={parkings}
            onParkingSelect={setSelectedParking}
            selectedParking={selectedParking}
          />
          {selectedParking && (
            <ParkingDetail
              parking={selectedParking}
              onClose={() => setSelectedParking(null)}
            />
          )}
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
