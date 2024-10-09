-- Crear la base de datos
CREATE DATABASE TiendaPruebas;

-- Usar la base de datos
USE TiendaPruebas;

-- Crear tabla de tipos de productos
CREATE TABLE TipoCantidad
(
    idTipoCantidad INT IDENTITY (1,1) PRIMARY KEY,
    tipo           NVARCHAR(50) NOT NULL
);

-- Insertar los tipos de unidades
INSERT INTO TipoCantidad (tipo)
VALUES ('kg');
INSERT INTO TipoCantidad (tipo)
VALUES ('ml');
INSERT INTO TipoCantidad (tipo)
VALUES ('lts');

-- Crear tabla de productos
CREATE TABLE Productos
(
    idProducto     INT IDENTITY (10001,1) PRIMARY KEY,
    nombreProducto NVARCHAR(100)  NOT NULL,
    marcaProducto  NVARCHAR(100)  NOT NULL,
    cantidadStock  INT            NOT NULL,
    idTipoCantidad INT            NOT NULL,
    cantidadTipo   DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idTipoCantidad) REFERENCES TipoCantidad (idTipoCantidad)
);

-- Insertar productos
INSERT INTO Productos (nombreProducto, marcaProducto, cantidadStock, idTipoCantidad, cantidadTipo)
VALUES ('Cheetos', 'Sabritas', 150, 1, 500),
       ('Coca-Cola', 'Coca-Cola FEMSA', 200, 3, 1),
       ('Tecate', 'Cuauhtémoc Moctezuma', 300, 3, 1),
       ('Ruffles', 'Sabritas', 120, 1, 400),
       ('Pepsi', 'PepsiCo', 180, 3, 1.5),
       ('Gansito', 'Marinela', 250, 1, 300),
       ('Maruchan', 'Maruchan Inc.', 130, 2, 500),
       ('Fresca', 'Coca-Cola FEMSA', 210, 3, 1.25),
       ('Barcel', 'Barcel', 170, 1, 450),
       ('XX Lager', 'Cuauhtémoc Moctezuma', 220, 3, 2);

-- Usar dbo master
USE master;

-- Crear el login
CREATE LOGIN UserTest
    WITH PASSWORD = 'password1234$';

-- Usar la base de datos
USE TiendaPruebas;

-- Crear el usuario a partir del login
CREATE USER UserTest FOR LOGIN UserTest;

-- Asignar roles de lectura y escritura dentro de la base de datos
ALTER ROLE db_datareader ADD MEMBER UserTest;
ALTER ROLE db_datawriter ADD MEMBER UserTest;

-- Otorgar permisos específicos en el esquema dbo
GRANT DELETE, UPDATE ON SCHEMA :: dbo TO UserTest;

-- Otorgar permisos específicos en la base de datos
GRANT SELECT, INSERT, UPDATE, DELETE ON DATABASE :: TiendaPruebas TO UserTest;