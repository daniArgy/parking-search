import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the parkingService
jest.mock('./services/parkingService', () => ({
  parkingService: {
    getAllParkings: jest.fn().mockResolvedValue([
      {
        id: '1',
        nombre: 'Test Parking',
        latitud: 42.2406,
        longitud: -8.7207,
        plazasLibres: 50,
        plazasTotales: 100,
        direccion: 'Test Address',
        porcentajeOcupacion: 50
      }
    ])
  }
}));

test('renders loading message initially', () => {
  render(<App />);
  const loadingElement = screen.getByText(/Cargando parkings/i);
  expect(loadingElement).toBeInTheDocument();
});
