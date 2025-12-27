export const getOccupancyColor = (porcentaje: number): string => {
  if (porcentaje < 50) {
    return '#10b981'; // verde - poca ocupación
  } else if (porcentaje < 80) {
    return '#f59e0b'; // naranja - ocupación media
  } else {
    return '#ef4444'; // rojo - alta ocupación
  }
};

export const getOccupancyLabel = (porcentaje: number): string => {
  if (porcentaje < 50) {
    return 'Baja ocupación';
  } else if (porcentaje < 80) {
    return 'Ocupación media';
  } else {
    return 'Alta ocupación';
  }
};

export const formatAddress = (direccion: string): string => {
  return direccion || 'Dirección no disponible';
};
