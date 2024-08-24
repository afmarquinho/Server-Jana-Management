# Jana Backend

Jana es una aplicación PERN para la gestión de licitaciones. Este repositorio contiene el backend, que maneja las operaciones relacionadas con los datos de las licitaciones.

## Descripción Técnica:

### Tecnologías Utilizadas:

- **Backend:**
  - **Node.js:** Entorno de ejecución del lado del servidor para la construcción de aplicaciones escalables.
  - **Express:** Framework de aplicación web para Node.js, optimizado para construir APIs robustas y eficientes.

- **Base de Datos:**
  - **PostgreSQL:** Sistema de gestión de bases de datos relacional y potente.
  - **Sequelize:** ORM para Node.js que facilita la interacción con bases de datos relacionales utilizando modelos.

- **Librerías y Frameworks Adicionales:**
  - **bcryptjs:** Para el hashing y comparación segura de contraseñas.
  - **colors:** Añade color a la salida de la terminal para mejorar la legibilidad de los logs.
  - **cors:** Habilita el Cross-Origin Resource Sharing para permitir peticiones desde diferentes dominios.
  - **dotenv:** Carga variables de entorno desde un archivo `.env` en `process.env`.
  - **express-validator:** Middleware para validar y sanitizar los datos de las solicitudes.
  - **jsonwebtoken:** Permite la creación y verificación de JSON Web Tokens para autenticación.
  - **morgan:** Middleware para el registro de solicitudes HTTP.
  - **multer:** Maneja la carga de archivos en las solicitudes HTTP.
  - **pg:** Cliente de PostgreSQL para conectar y consultar bases de datos.
  - **pg-hstore:** Serializador para el tipo de dato `hstore` de PostgreSQL.
  - **sequelize-typescript:** Integra TypeScript con Sequelize para definiciones de modelos seguras en cuanto a tipos.
  - **swagger-jsdoc:** Genera documentación de la API Swagger a partir de comentarios JSDoc.
  - **swagger-ui-express:** Sirve la documentación de la API Swagger en una interfaz web.

## Instrucciones de Instalación y Configuración:

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/afmarquinho/Server-Jana-Management.git
   cd Server-Jana-Management
   ```
2. **Instalar Dependencias:**
   ```bash
   npm install
   ```
3. **Configuración:**
Crear un archivo .env en la raíz del proyecto con la configuración adecuada, incluyendo detalles de la base de datos y claves JWT.

4. **Ejecutar la Aplicación:**

## Características Destacadas:

### Seguridad Avanzada:
Implementación de JWT para garantizar una autenticación segura y autorización controlada.

### Gestión Eficiente de Archivos:
Carga y almacenamiento de archivos, incluyendo documentos y perfiles de usuario.

### Documentación de API:
Generación y visualización de la documentación de la API utilizando Swagger.

### Escalabilidad y Flexibilidad:
Utilización de Sequelize y PostgreSQL para una base de datos robusta y escalable.
Este repositorio contiene el código fuente completo del backend de Jana, una aplicación diseñada para la gestión de licitaciones. ¡Explora y potencia la gestión de tus procesos de licitación con nuestra solución avanzada!
