# Prácticas de Web 🍎

![Node.js](https://img.shields.io/badge/Node.js-v20.18.0-darkgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## Tecnologías Utilizadas 💻

Este proyecto utiliza las siguientes tecnologías:

- **Node.js**
- **SQL Server 2022**
- **Express** (Uso de servidor HTTP)
- **TypeScript** (Lenguaje principal)
- **SQL** (Lenguaje para base de datos)
- **Handlebars** (Motor de plantillas)

## Estilos usados 🎨

- **Bootstrap v5.3.3**
- **Fontawesome v6.6.0**

## Otras Librerías 📕

Además de las tecnologías principales, este proyecto incluye varias librerías adicionales para facilitar el desarrollo:

- `dotenv`: Para cargar variables de entorno.
- `cors`: Middleware para habilitar CORS.
- `pino`: Logger de alto rendimiento.
- `pino-pretty`: Formatea la salida del logger `pino`.
- `express-handlebars`: Motor de plantillas para Express usando Handlebars.
- `mssql`: Cliente para SQL Server.
- `concurrently`: Ejecuta múltiples comandos al mismo tiempo.
- `cross-env`: Para establecer variables de entorno de forma independiente del sistema operativo.

## Cómo Ejecutar el Proyecto 🤔

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio y abrir el proyecto**:

    ```bash
    git clone https://github.com/Gerbo67/web-parcial2.git
    ```

   Una vez clonado, abre el proyecto con el Editor de código preferido (Visual Studio Code o WebStorm).

2. **Instalar dependencias**:

   Abre la consola dentro del editor. Luego, ejecuta:

    ```bash
    npm install
    ```
3. **Crear la base de datos**:

   En la carpeta `scripts_sql_temps`, encontrarás un archivo SQL. Abre este archivo con tu herramienta de 
   administración de bases de datos preferida (como SQL Server Management Studio o Azure Data Studio) y ejecuta el script paso a paso para crear la base de datos necesaria.

4. **Configurar variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias:

    ```plaintext
    # .env 
    DB_USER=tu-user
    DB_NAME=tu-bdname
    DB_PASSWORD=tu-contraseña
    DB_SERVER=localhost
    ```

5. **Compilar el proyecto**:

   Si estás usando TypeScript, necesitarás compilar el código:

    ```bash
    npm run build
    ```

6. **Iniciar el servidor**:

   Luego, puedes iniciar el servidor con:

    ```bash
    npm start
    ```

   O, si deseas iniciar en modo de desarrollo (con reinicio automático en cambios de archivos):

    ```bash
    npm run server
    ```

7. **Acceder a la aplicación**:

   Una vez que el servidor esté en funcionamiento, puedes acceder a la aplicación desde tu navegador en `http://localhost:3000`.

## Detalles Adicionales

Para más detalles sobre cómo funciona cada parte del proyecto y la estructura del código, revisa los comentarios dentro de los archivos fuente o consulta la documentación de las librerías y tecnologías usadas.

---

🥳💃 ¡Disfruta codificando! 💃🥳
