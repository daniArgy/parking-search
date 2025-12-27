# Arquitectura del Proyecto

## Visión General

Este proyecto implementa una aplicación web para búsqueda de parkings en Vigo utilizando arquitectura hexagonal en el backend y componentes React en el frontend.

## Backend - Arquitectura Hexagonal

### Capas

#### 1. Dominio (Domain)
- **Responsabilidad**: Lógica de negocio pura
- **Componentes**:
  - `Parking.php`: Entidad que representa un parking
  - `ParkingRepositoryInterface.php`: Puerto (interfaz) para acceso a datos

**Principios**:
- Sin dependencias externas
- Lógica de negocio independiente de infraestructura
- Entidades inmutables con validaciones

#### 2. Aplicación (Application)
- **Responsabilidad**: Casos de uso y orquestación
- **Componentes**:
  - `GetAllParkingsUseCase.php`: Obtener todos los parkings
  - `GetParkingByIdUseCase.php`: Obtener parking por ID

**Principios**:
- Un caso de uso por operación de negocio
- Coordina entre dominio e infraestructura
- Sin lógica de presentación

#### 3. Infraestructura (Infrastructure)
- **Responsabilidad**: Implementaciones técnicas
- **Componentes**:
  - `VigoParkingRepository.php`: Implementación del repositorio
  - `FileCache.php`: Sistema de caché basado en archivos
  - `CacheInterface.php`: Abstracción del caché

**Principios**:
- Adaptadores para servicios externos
- Implementa interfaces del dominio
- Caché de 5 minutos para optimización

#### 4. Presentación (Presentation)
- **Responsabilidad**: API HTTP
- **Componentes**:
  - `ParkingController.php`: Controlador REST
  - `ApiResponse.php`: Formato de respuestas

**Principios**:
- Routing simple basado en URI
- Respuestas JSON estandarizadas
- CORS habilitado para frontend

## Frontend - React + TypeScript

### Estructura de Componentes

#### Componentes Principales

1. **App.tsx**
   - Componente raíz
   - Gestión de estado global
   - Orquestación de componentes

2. **MapComponent.tsx**
   - Renderizado del mapa con Leaflet
   - Marcadores de parkings
   - Interacción con mapa

3. **SearchBar.tsx**
   - Búsqueda de direcciones
   - Botón de geolocalización

4. **ParkingDetail.tsx**
   - Panel lateral con detalles
   - Integración con Google Maps

5. **ParkingList.tsx**
   - Lista de parkings disponibles
   - Selección rápida

### Services

- **parkingService.ts**: Cliente HTTP para API
- Centraliza llamadas al backend
- Manejo de errores

### Utils

- **parkingUtils.ts**: Funciones auxiliares
- Cálculo de colores por ocupación
- Formateo de datos

## Flujo de Datos

```
Usuario → Frontend (React) → HTTP Request → Backend (PHP)
                                                 ↓
                                    Presentation Layer
                                                 ↓
                                    Application Layer (Use Cases)
                                                 ↓
                                    Domain Layer (Business Logic)
                                                 ↓
                                    Infrastructure Layer
                                                 ↓
                              Cache ← → External API (Vigo Open Data)
```

## Caché

- **TTL**: 5 minutos (300 segundos)
- **Tipo**: File-based cache
- **Ubicación**: `/backend/cache`
- **Ventajas**: 
  - Reduce llamadas a API externa
  - Mejora tiempos de respuesta
  - Evita límites de rate

## Comunicación Frontend-Backend

### Endpoints

- `GET /api/parkings` - Lista de todos los parkings
- `GET /api/parkings/{id}` - Detalle de un parking

### Formato de Respuesta

```json
{
  "success": true,
  "data": {
    "id": "1",
    "nombre": "Parking Centro",
    "latitud": 42.2406,
    "longitud": -8.7207,
    "plazasLibres": 50,
    "plazasTotales": 100,
    "direccion": "Calle Principal, 1",
    "porcentajeOcupacion": 50.0
  }
}
```

## Despliegue

### Docker

- **backend**: Apache + PHP 8.2
- **frontend**: Nginx + React build
- **red**: Bridge network para comunicación

### Puertos

- Frontend: 3000
- Backend: 8080

## Testing

### Backend
- PHPUnit para tests unitarios
- Tests de entidades de dominio
- Cobertura de lógica de negocio

### Frontend
- Jest + React Testing Library
- Tests de utilidades
- Tests de tipos TypeScript

## Principios de Clean Code Aplicados

1. **Separación de responsabilidades**
2. **Inyección de dependencias**
3. **Interfaces para abstracciones**
4. **Nombres descriptivos**
5. **Funciones pequeñas y específicas**
6. **DRY (Don't Repeat Yourself)**
7. **SOLID principles**
