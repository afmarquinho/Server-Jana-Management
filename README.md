# Jana Management System

Jana es una aplicación PERN para la gestión de licitaciones. Este repositorio contiene el backend, que maneja las operaciones relacionadas con los datos.

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

### Requerimientos previos.

- Tener instalado el entorno Node.js LTS. Si no lo tiene, puede visitar https://nodejs.org/en
- Tener git instalado. Si no lo tiene, puede visitar https://git-scm.com/
- Tener instalado el editor de código de su preferencia, VS CODE recomendado.
- Para administrar la base de datos, preferiblemente un servicio contratado en la nube, si la tiene local, solo debe cambiar el string de conexión en la variable de entorno.

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/afmarquinho/Server-Jana-Management.git
   ```
2. **Cambiar el nombre de la carpeta clonada a "server".**

3. **Abrir la consola e ingresar a la carpeta "server".**

4. **Instalar Dependencias:**
   ```bash
   npm install
   ```
5. **Configuración:**
   Copie en la raiz del proyecto el archivo ".env.template" y renombrelo a ".env", si ya tiene su proveedor de base de datos, cambie el string de conexión.

6. **Ejecutar la Aplicación:**

```bash
   npm run dev
```

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
