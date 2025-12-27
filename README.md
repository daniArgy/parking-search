# Parking Search - Buscador de Parkings de Vigo

Aplicación web responsive en español para buscar y visualizar parkings públicos de Vigo en tiempo real. Desarrollada con **React + TypeScript** en el frontend y **PHP con Arquitectura Hexagonal** en el backend, completamente dockerizada.

## 🚀 Características

- **Mapa siempre visible** con todos los parkings de Vigo
- **Marcadores por ocupación**: Colores según disponibilidad (verde: baja, naranja: media, rojo: alta)
- **Búsqueda por dirección**: Encuentra parkings por nombre o ubicación
- **Geolocalización**: Encuentra tu ubicación actual en el mapa
- **Detalles de parking**: Información completa con plazas libres y ocupación
- **Cómo llegar**: Integración con Google Maps para rutas
- **Backend con caché**: Los datos se almacenan en caché durante 5 minutos
- **Arquitectura limpia**: Código organizado con Clean Code y Hexagonal Architecture
- **Tests incluidos**: Tests unitarios para frontend y backend
- **Totalmente responsive**: Optimizada para móviles, tablets y desktop

## 📋 Requisitos

- Docker (versión 20.10 o superior)
- Docker Compose (versión 1.29 o superior)
- Puertos 3000 y 8080 disponibles

## 🔧 Instalación y Ejecución

### Opción 1: Con Docker Compose (Recomendado)

1. **Clonar el repositorio**:
```bash
git clone https://github.com/daniArgy/parking-search.git
cd parking-search
```

2. **Iniciar la aplicación**:
```bash
docker-compose up --build
```

3. **Acceder a la aplicación**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

4. **Detener la aplicación**:
```bash
docker-compose down
```

### Opción 2: Desarrollo Local

#### Backend (PHP)

1. **Navegar al directorio backend**:
```bash
cd backend
```

2. **Instalar dependencias**:
```bash
composer install
```

3. **Iniciar servidor PHP**:
```bash
php -S localhost:8080 -t public
```

4. **Ejecutar tests**:
```bash
./vendor/bin/phpunit
```

#### Frontend (React + TypeScript)

1. **Navegar al directorio frontend**:
```bash
cd frontend
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
cp .env.example .env
```

4. **Iniciar servidor de desarrollo**:
```bash
npm start
```

5. **Ejecutar tests**:
```bash
npm test
```

6. **Construir para producción**:
```bash
npm run build
```

## 🏗️ Arquitectura

### Backend (PHP)

El backend sigue los principios de **Arquitectura Hexagonal (Puertos y Adaptadores)** y **Clean Code**:

```
backend/
├── src/
│   ├── Domain/              # Entidades y lógica de negocio
│   │   ├── Parking.php
│   │   └── ParkingRepositoryInterface.php
│   ├── Application/         # Casos de uso
│   │   ├── GetAllParkingsUseCase.php
│   │   └── GetParkingByIdUseCase.php
│   ├── Infrastructure/      # Implementaciones técnicas
│   │   ├── VigoParkingRepository.php
│   │   ├── FileCache.php
│   │   └── CacheInterface.php
│   └── Presentation/        # Controladores y API
│       ├── ParkingController.php
│       └── ApiResponse.php
├── public/
│   └── index.php           # Punto de entrada
├── tests/                  # Tests unitarios
├── cache/                  # Caché de datos
└── Dockerfile
```

**Capas de la arquitectura**:
- **Domain**: Lógica de negocio pura, sin dependencias externas
- **Application**: Casos de uso que orquestan la lógica de dominio
- **Infrastructure**: Implementaciones concretas (API externa, caché)
- **Presentation**: Capa HTTP (controladores, rutas, respuestas)

### Frontend (React + TypeScript)

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── MapComponent.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ParkingDetail.tsx
│   │   └── ParkingList.tsx
│   ├── services/            # Servicios de API
│   │   └── parkingService.ts
│   ├── types/               # Definiciones TypeScript
│   │   └── Parking.ts
│   ├── utils/               # Utilidades
│   │   └── parkingUtils.ts
│   ├── App.tsx              # Componente principal
│   └── App.css              # Estilos globales
├── public/
├── Dockerfile
└── nginx.conf
```

## 🔌 API Endpoints

### GET /api/parkings
Obtiene todos los parkings disponibles.

**Respuesta**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "nombre": "Parking Centro",
      "latitud": 42.2406,
      "longitud": -8.7207,
      "plazasLibres": 50,
      "plazasTotales": 100,
      "direccion": "Calle Principal, 1",
      "porcentajeOcupacion": 50.0
    }
  ]
}
```

### GET /api/parkings/{id}
Obtiene detalles de un parking específico.

**Respuesta**:
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

## 🧪 Tests

### Backend
```bash
cd backend
composer install
./vendor/bin/phpunit
```

### Frontend
```bash
cd frontend
npm install
npm test
```

## 📦 Tecnologías Utilizadas

### Backend
- PHP 8.2
- Composer
- PHPUnit (tests)
- Apache
- Docker

### Frontend
- React 18
- TypeScript
- Leaflet / React-Leaflet (mapas)
- Axios (HTTP client)
- Jest (tests)
- Nginx (producción)
- Docker

## 🔒 Características de Seguridad

- CORS configurado correctamente
- Validación de datos de entrada
- Headers de seguridad en Nginx
- Sin credenciales hardcodeadas
- Manejo seguro de errores

## 🎨 Diseño Responsive

La aplicación está optimizada para:
- 📱 Móviles (< 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 📊 Fuente de Datos

Los datos de parkings se obtienen de la API pública de **Open Data Vigo**:
- URL: https://datos.vigo.org/resource/tpak-v6si.json
- Los datos se cachean durante 5 minutos para optimizar el rendimiento

## 🛠️ Configuración

### Variables de Entorno

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080/api
```

#### Backend
El backend utiliza caché de archivos en el directorio `cache/` con TTL de 300 segundos (5 minutos).

## 🐛 Solución de Problemas

### El mapa no carga
- Verifica que el backend esté funcionando: http://localhost:8080/api/parkings
- Comprueba la conexión a internet (necesaria para tiles de OpenStreetMap)

### Error de CORS
- Asegúrate de que el backend está configurado con CORS habilitado
- Verifica que la URL del API en el frontend coincida con el backend

### Error 404 en producción
- Verifica que nginx.conf esté configurado correctamente
- El archivo debe incluir `try_files $uri $uri/ /index.html;`

## 📝 Licencia

Este proyecto está bajo licencia MIT.

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en GitHub.

---

Desarrollado con ❤️ para la ciudad de Vigo
