import { Parking } from './types/Parking';

test('Parking type is properly defined', () => {
  const parking: Parking = {
    id: '1',
    nombre: 'Test Parking',
    latitud: 42.2406,
    longitud: -8.7207,
    plazasLibres: 50,
    plazasTotales: 100,
    direccion: 'Test Address',
    ocupacion: 50,
    porcentajeOcupacion: 50
  };
  
  expect(parking.id).toBe('1');
  expect(parking.nombre).toBe('Test Parking');
  expect(parking.plazasLibres).toBe(50);
});
