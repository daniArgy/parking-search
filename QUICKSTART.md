# Guía de Inicio Rápido

## ⚡ Inicio rápido con Docker (Recomendado)

### 1. Prerrequisitos
- Docker instalado
- Docker Compose instalado
- Puertos 3000 y 8080 disponibles

### 2. Clonar y ejecutar
```bash
# Clonar el repositorio
git clone https://github.com/daniArgy/parking-search.git
cd parking-search

# Iniciar la aplicación
docker compose up --build

# La aplicación estará disponible en:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8080/api
```

### 3. Probar la aplicación

1. Abre http://localhost:3000 en tu navegador
2. Verás el mapa de Vigo con los parkings públicos
3. Haz clic en "Mi ubicación" para geolocalizarte
4. Busca parkings por nombre o dirección
5. Haz clic en los marcadores para ver detalles
6. Usa "Cómo llegar" para abrir Google Maps

## 🛑 Detener la aplicación

```bash
# Detener los contenedores
docker compose down

# Detener y eliminar volúmenes
docker compose down -v
```

## 🔄 Reiniciar después de cambios

```bash
# Reconstruir las imágenes
docker compose up --build

# Solo reiniciar sin reconstruir
docker compose restart
```

## 📝 Desarrollo local (sin Docker)

### Backend

```bash
cd backend

# Instalar dependencias
composer install

# Iniciar servidor PHP
php -S localhost:8080 -t public

# Ejecutar tests
./vendor/bin/phpunit
```

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar desarrollo
npm start

# Ejecutar tests
npm test

# Construir para producción
npm run build
```

## 🎨 Características principales

### Colores de marcadores
- 🟢 Verde: Baja ocupación (< 50%)
- 🟠 Naranja: Ocupación media (50-80%)
- 🔴 Rojo: Alta ocupación (> 80%)

### Funcionalidades
- ✅ Mapa siempre visible con todos los parkings
- ✅ Búsqueda por nombre o dirección
- ✅ Geolocalización con un clic
- ✅ Detalles completos de cada parking
- ✅ Direcciones a Google Maps
- ✅ Actualización automática desde API de Vigo
- ✅ Caché de 5 minutos para mejor rendimiento
- ✅ Diseño responsive (móvil, tablet, desktop)

## 🔧 Troubleshooting

### El mapa no carga
- Verifica que el backend esté funcionando: http://localhost:8080/api/parkings
- Asegúrate de tener conexión a internet (se requiere para los tiles del mapa)

### Error de puertos ocupados
```bash
# Cambiar los puertos en docker-compose.yml
ports:
  - "3001:80"  # Cambiar 3000 por 3001
  - "8081:80"  # Cambiar 8080 por 8081
```

### El backend no devuelve datos
- Verifica que puedes acceder a: https://datos.vigo.org/resource/tpak-v6si.json
- Revisa los logs: `docker compose logs backend`

### Error de permisos en cache
```bash
# Dar permisos al directorio de cache
chmod -R 777 backend/cache
```

## 📱 Uso en móvil

1. Asegúrate de que tu móvil y ordenador estén en la misma red
2. Encuentra la IP de tu ordenador (ej: 192.168.1.100)
3. Accede desde el móvil a: http://192.168.1.100:3000
4. Permite el acceso a la ubicación cuando se solicite

## 🧪 Ejecutar tests

```bash
# Tests del backend
cd backend && ./vendor/bin/phpunit

# Tests del frontend
cd frontend && npm test

# Con Docker
docker compose exec backend ./vendor/bin/phpunit
docker compose exec frontend npm test
```

## 📊 Monitoreo

### Ver logs en tiempo real
```bash
# Todos los servicios
docker compose logs -f

# Solo backend
docker compose logs -f backend

# Solo frontend
docker compose logs -f frontend
```

### Estado de los contenedores
```bash
docker compose ps
```

### Uso de recursos
```bash
docker stats
```

## 🚀 Despliegue en producción

### Variables de entorno importantes

**Frontend** - Crear archivo `.env`:
```
REACT_APP_API_URL=https://tu-dominio.com/api
```

**Backend** - Configurar en docker-compose.yml:
```yaml
environment:
  - PHP_MEMORY_LIMIT=512M
```

### Recomendaciones
- Usar HTTPS en producción
- Configurar un dominio personalizado
- Implementar rate limiting en el backend
- Aumentar el TTL de caché según necesidades
- Configurar backups periódicos
- Monitorizar logs y errores

## 💡 Tips útiles

1. **Actualización de datos**: El caché se actualiza automáticamente cada 5 minutos
2. **Búsqueda**: Puedes buscar por nombre completo o parcial
3. **Navegación**: Usa el scroll del ratón para hacer zoom en el mapa
4. **Móvil**: En móvil, los controles se adaptan automáticamente
5. **Rendimiento**: El caché mejora significativamente el tiempo de respuesta

## 🆘 Soporte

Si encuentras algún problema:
1. Revisa la documentación en README.md
2. Consulta la arquitectura en ARCHITECTURE.md
3. Abre un issue en GitHub con detalles del error
4. Incluye los logs relevantes

## 📚 Más información

- [README.md](README.md) - Documentación completa
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitectura del sistema
- [API de Vigo Open Data](https://datos.vigo.org/) - Fuente de datos
