# MetNet API

API REST desarrollada con Node.js y Express para la gestión de tareas.

## Requisitos

- Node.js (v14 o superior)
- MongoDB

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd metnet-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env:
Copiar el archivo .env.example a .env y ajustar las variables según sea necesario:
```bash
cp .env.example .env
```

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

### Tests
```bash
npm test
```

## Endpoints

- GET /tasks - Obtener todas las tareas
- POST /tasks - Crear una nueva tarea
- PUT /tasks/:id - Actualizar una tarea existente
- DELETE /tasks/:id - Eliminar una tarea

### Ejemplo de payload para crear/actualizar tarea

```json
{
  "title": "Nombre de la tarea",
  "description": "Descripción de la tarea",
  "completed": false
}
```

## Características

- CRUD completo para tareas
- Validación de datos
- Tests unitarios
- Manejo de errores
- CORS habilitado
- MongoDB como base de datos 

## Decisiones Técnicas

### Arquitectura
- **Patrón MVC**: Separación clara entre modelos, controladores y rutas para facilitar mantenimiento y escalabilidad
- **Middleware**: Implementación de middleware para validación, autenticación y manejo de errores

### Base de Datos
- **MongoDB Atlas**: Servicio cloud para almacenamiento de datos que permite escalabilidad
- **Mongoose**: ODM para modelado de datos y validación en MongoDB

### Seguridad
- **Variables de entorno**: Configuración sensible almacenada en variables de entorno (.env)
- **IP Whitelist**: Control de acceso mediante lista blanca de IPs en MongoDB Atlas

### Desarrollo
- **Nodemon**: Recarga automática del servidor durante desarrollo
- **Jest**: Framework para pruebas unitarias e integración
- **ESLint**: Herramienta para mantener consistencia en el código

### API
- **REST**: Diseño de API siguiendo principios REST
- **JSON**: Formato estándar para intercambio de datos
- **Express**: Framework minimalista para desarrollo de APIs 