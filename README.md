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

### 1. Clonar el repositorio y abrir el proyecto

```bash
git clone https://github.com/Gerbo67/web-parcial2.git
```


Una vez clonado, abre el proyecto con el Editor de código preferido (Visual Studio Code o WebStorm).

### 2. Instalar dependencias

Abre la consola dentro del editor. Luego, ejecuta:

```bash
npm install
```

### 3. Configurar SQL Server

#### 3.1 Habilitar modo de autenticación mixta

1. Abre **SQL Server Management Studio** y conéctate a tu instancia de SQL Server.
2. Haz clic derecho en el servidor y selecciona **Propiedades**.
3. En la ventana de propiedades, selecciona la pestaña **Seguridad**.
4. Elige la opción **SQL Server y Modo de Autenticación de Windows**.
5. Haz clic en **Aceptar** y reinicia el servidor.

![Habilitar Autenticación Mixta](/img_ignore/sqlsecurity.png)

#### 3.2 Habilitar TCP/IP

1. Abre **SQL Server Configuration Manager**.
2. En **SQL Server Network Configuration**, selecciona **Protocols for MSSQLSERVER**.
3. Haz clic derecho en **TCP/IP** y selecciona **Enable**.
4. Reinicia el servicio SQL Server para aplicar los cambios.

![Habilitar TCP/IP](/img_ignore/sqltcpip.png)

### 4. Crear la base de datos

En la carpeta `scripts_sql_temps`, encontrarás un archivo SQL. Abre este archivo con tu herramienta de administración de bases de datos preferida (como SQL Server Management Studio o Azure Data Studio) y ejecuta el script paso a paso para crear la base de datos necesaria.

### 5. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias.
Los datos los encontrarás en el mismo archivo SQL, el único dato que no se modifica es el último.

```plaintext
# .env
DB_USER=tu-user
DB_NAME=tu-bdname
DB_PASSWORD=tu-contraseña
DB_SERVER=tu-server
```

### 6. Compilar el proyecto

Si estás usando TypeScript, necesitarás compilar el código:

```bash
npm run build
```

### 7. Iniciar el servidor

Luego, puedes iniciar el servidor con:

```bash
npm start
```

O, si deseas iniciar en modo de desarrollo (con reinicio automático en cambios de archivos):

```bash
npm run server
```

### 8. Acceder a la aplicación

Una vez que el servidor esté en funcionamiento, puedes acceder a la aplicación desde tu navegador en `http://localhost:3000`.

## Contexto del Código

### Carpeta `src`

La carpeta `src` es donde editarás el código. Aquí verás un archivo llamado `index.ts`, en este toda la lógica del servidor es colocada usando el patrón **Singleton**. Además, hay carpetas que siguen el modelo de **Clean Architecture**, donde las carpetas están divididas por responsabilidades. Estas carpetas son:

#### - **config**
- Esta carpeta contiene las configuraciones de datos. Aquí se obtienen los datos del archivo `.env` y se estructuran para su utilización en todo el proyecto.

#### - **controllers**
- Los controladores son donde reside la lógica secuenciada del negocio. En esta capa se reciben los datos de las rutas y se brinda respuesta al cliente. Importante: esta capa nunca debe contener lógica de base de datos; solo debe llamar a los repositorios correspondientes.

#### - **database**
- En esta carpeta se administra la conexión a la base de datos. Aunque es posible tener conexiones a varias bases de datos, en este caso solo se utiliza SQL Server.

#### - **repository**
- Basado en el patrón de repositorio, aquí se modulariza la lógica de base de datos. Esto permite que, si en algún momento se requiere cambiar de base de datos, solo sea necesario modificar estos archivos. El repositorio debe recibir y devolver los mismos parámetros y datos con la misma estructura. Aquí se instruye toda la lógica de base de datos, consultas y demás.

#### - **routes**
- Las subrutas se gestionan en esta carpeta. Aquí se asigna el tipo de petición y se dirige al controlador correspondiente. La ruta principal se define en el `index.ts` y las subrutas en sus archivos respectivos.

#### - **utils**
- Contiene código que funciona como pequeñas librerías a lo largo de todo el proyecto, proporcionando funciones utilitarias y generales.

**Nota**: Por cada módulo nuevo (por ejemplo, productos), se debe crear un `route`, `controller` y `repository` correspondiente.

### Carpeta `build`

La carpeta `build` es una carpeta que se genera cuando se compila el código de TypeScript a JavaScript. En esta carpeta no se debe modificar nada de código, pero podrás observar que existe cuando descargas del repositorio. Con ayuda de `.gitignore` evitamos las carpetas que se compilan desde `src`, pero dejamos las siguientes carpetas:

#### - **assets**
- Esta carpeta contendrá todas las imágenes, fuentes y otros recursos estáticos.

#### - **plugins**
- Esta carpeta contendrá todos los plugins que se van a usar en el proyecto, incluyendo archivos CSS, JS y HTML si se requiere.

#### - **views**
- En esta carpeta se pondrán todas las vistas que usarás a lo largo del proyecto.

## Tutorial del Código

Entender Handlebars:

Handlebars es un motor de plantillas. Esto quiere decir que te permite insertar código no HTML dentro de tus vistas, usando los datos enviados por cada controlador. Esto se traduce en un mejor consumo y manejo de datos.

Para su uso en los `controllers`, debes enviar la estructura de datos a la vista y usarlo como se deba.

Hay un archivo `main` que tiene la estructura general del proyecto y dentro de este se renderizan las demás vistas. Así, no tienes que declarar elementos comunes como el navbar múltiples veces. La renderización dinámica se maneja dentro de la etiqueta `main`, mientras que el resto de la estructura permanece constante.

Si deseas crear una carpeta para un nuevo módulo (por ejemplo, usuarios), lo crearías dentro de la carpeta `views` en `build` (el único lugar de `build` donde modificarás código). Una vez creada la carpeta con al menos un archivo Handlebars, debes actualizar el archivo `index.ts` en la línea 54 (buscar el comentario `// Agregar carpetas nuevas creadas en view`). Luego, podrás usar esa carpeta en tus `controllers` y mantendrás una estructura de carpetas adecuada.

## Documentación sencilla de Handlebars

### Estructuras y Condicionales

- **{{#if}}**: Condicional básico para evaluar si una variable es verdadera.

    ```handlebars
    {{#if user}}
      <p>Bienvenido, {{user.name}}!</p>
    {{else}}
      <p>Por favor, inicia sesión.</p>
    {{/if}}
    ```

- **{{#each}}**: Bucle para iterar sobre listas o arrays.

    ```handlebars
    <ul>
      {{#each users}}
        <li>{{this.name}}</li>
      {{/each}}
    </ul>
    ```

### Helpers

- **equal (==):** Verificar igualdad entre dos valores.

    ```handlebars
    {{#if (eq value 10)}}
      <p>El valor es 10</p>
    {{else}}
      <p>El valor no es 10</p>
    {{/if}}
    ```

- **comparar mayor que (>):**

    ```handlebars
    {{#if (gt value 10)}}
      <p>El valor es mayor que 10</p>
    {{/if}}
    ```

Para más detalles, puedes consultar la [documentación oficial de Handlebars](https://handlebarsjs.com/).

## Detalles Adicionales

Para más detalles sobre cómo funciona cada parte del proyecto y la estructura del código, revisa los comentarios dentro de los archivos fuente o consulta la documentación de las librerías y tecnologías usadas.

---

🥳💃 ¡Disfruta codificando! 💃🥳