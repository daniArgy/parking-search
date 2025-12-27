export interface Parking {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
  plazasLibres: number;
  plazasTotales: number;
  direccion: string;
  porcentajeOcupacion: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
