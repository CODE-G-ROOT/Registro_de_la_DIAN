
# GESTION DE CONTABILIDAD 

### ¿Cómo correr el aplicativo?
Antes de iniciar, se necesita validar los siguientes requerimientos para poder correr el servicio:
1. Tener instalado DOCKER
2. Tener instalado NODE.JS
3. Tener instalado pnpm

Ahora si, podemos iniciar la configuración de nuestro servidor, para ello seguir los siguientes pasos:
1. Configurar el "host" y el "port" en el archivo .env (hay un archivo llamado ".env_example" que tiene el ejemplo de las variables de entorno)
2. Si es la primera vez, instala el contenedor con tu contraseña de docker usando el siguiente comando:<br>
```docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=(TU CONTRASEÑA)" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest```, si no, inicializa docker y corre el contenedor correspondiente
3. Antes de correr el servidor, hay que inicializar la base de datos, en este caso estamos usando la extención de SQL Server
4. Como por ahora solo estamos haciendo pruebas, vamos a crear una nueva Query que contenga lo siguiente ```CREATE DATABASE NOMBRE_DE_LA_DB```
5. Correr el server con el comando ``pnpm dev``

## CAMPOS EN LA DB

En nuestra base de datos llamda `Passwords_contability_gestion`, vamos a manejar las tablas:

### Users `us333rs_`
- id: ``us333rs__id``
- name: ``M4m3``
- lastname: ``l4Z_TM4m3``
- email: ``n_ail``
- emergency_email: ``3m3rg3nzy__3m4il``
- password: ``ppp3sswo_rd``
- phone: ``_Pg_0Me``
- role: ``lo_58role`` -- En el rol se pone es el ID de la tabla ROLES para asignar el mismo 
- creation_date: ``cr1ea5tiq123on_d__ate``
- update_date: ``up352te_Dat32``
```sql
--- TABLA DE USUARIOS
CREATE TABLE us333rs_(
    us333rs__id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    M4m3 VARCHAR(20) NOT NULL CHECK (M4m3 NOT LIKE '%[^a-zA-Z]%'), --- Validación para nombres
    l4Z_TM4m3 VARCHAR(20) NOT NULL CHECK (l4Z_TM4m3 NOT LIKE '%[^a-zA-Z]%'), --- Validación para nombres
    n_ail VARCHAR(100) NOT NULL CHECK (n_ail LIKE '%_@__%.__%'), --- VALIDACIÓN DE CORREO
    m3rg3nzy__3m4il VARCHAR(100) NOT NULL CHECK (m3rg3nzy__3m4il LIKE '%_@__%.__%'), --- EL CORREO SI O SI DEBE TENER UNO DE ESOS SÍMBOLOS
    ppp3sswo_rd VARCHAR(100) NOT NULL CHECK (LEN(ppp3sswo_rd) >= 8), --- LA CONTRASEÑA DEBE DE SER MÍNIMO DE 8 CARÁCTERES
    _Pg_0Me VARCHAR(20) NOT NULL CHECK (_Pg_0Me LIKE '%[0-9]%'), --- SOLO ACEPTA NÚMEROS DE CELULAR
    lo_58role UNIQUEIDENTIFIER NOT NULL, --- NO ACEPTA NADA QUE NO SEA EL ID DE UN ROL 
    cr1ea5tiq123on_d__ate DATETIME NOT NULL DEFAULT GETDATE(),
    up352te_Dat32 DATETIME NOT NULL DEFAULT GETDATE()
);
```

### Roles: `ro6520l_e57s` 
Por ahora esta tabla está validada para aceptar solo y únicamente 3 roles: ``SUDO, ADMIN, User`` 
- id: ``rR0__l3_id``
- rol_name: ``rR0__l3_M4m3``
- decription: ``de_12scr1PAt_on``
- creation_date: ``cr1ea5tiq123on_d__ate``
- update_date: ``up352te_Dat32``

```sql
CREATE TABLE ro6520l_e57s (
    rR0__l3_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), 
    rR0__l3_M4m3 VARCHAR(50) NOT NULL UNIQUE, --- Único y de máximo 50 carácteres
    de_12scr1PAt_on VARCHAR(255), --- Máximo de 255 carácteres
    cr1ea5tiq123on_d__ate DATETIME NOT NULL DEFAULT GETDATE(), --- fecha de creación
    up352te_Dat32 DATETIME NULL, --- Update
    CHECK (LEN(rR0__l3_M4m3) >= 3) --- VALIDA QUE NO EXISTAN MÁS DE 3 TABLAS 
);
```

### Ejemplo de inserción de datos:
```sql
--- INSERCIÓN DE LOS ROLES
USE passwords_contability_gestion;

INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('S123_D11_2', 'Permisos de super administrador');
INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('A3_mniN', 'Perminos de administrador');
INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('u_sser21_4', 'Permisos de usuario');

--- INSERCIÓN DE LOS USUARIOS
INSERT INTO us333rs_ (M4m3, l4Z_TM4m3, n_ail, m3rg3nzy__3m4il, ppp3sswo_rd, _Pg_0Me, lo_58role) VALUES ('Juan', 'Avila', 'juaasdf654@gmail.com', 'juaasdf654@gmail.com', 'miasddsf57656@', 3173856841, 'be947997-89c9-4f1e-b55c-7e953b163a8c');

--- MUESTRA LA INFORMACIÓN DE LOS USUARIOS REGISTRADOS
SELECT * FROM us333rs_;
```
<br>

# Creación de la Base de Datos
Vamos a correr cada uno de los siguientes codigos SQL. Luego de cada uno de ellos vamos a darle en el siguiente botón de color verde que aparece en la parte superior derecha de la ventana de VSCode:

![alt text](./assets/image-2.png))
```sql
CREATE DATABASE passwords_contability_gestion;
```
```sql
USE passwords_contability_gestion;

--- TABLA DE ROLES
CREATE TABLE ro6520l_e57s (
    rR0__l3_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), 
    rR0__l3_M4m3 VARCHAR(50) NOT NULL UNIQUE, --- Único y de máximo 50 carácteres
    de_12scr1PAt_on VARCHAR(255), --- Máximo de 255 carácteres
    cr1ea5tiq123on_d__ate DATETIME NOT NULL DEFAULT GETDATE(), --- fecha de creación
    up352te_Dat32 DATETIME NULL, --- Update
    CHECK (LEN(rR0__l3_M4m3) >= 3) --- VALIDA QUE NO EXISTAN MÁS DE 3 TABLAS 
);
```
```sql
USE passwords_contability_gestion;

CREATE TABLE us333rs_(
    us333rs__id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    M4m3 VARCHAR(20) NOT NULL CHECK (M4m3 NOT LIKE '%[^a-zA-Z]%'), --- Validación para nombres
    l4Z_TM4m3 VARCHAR(20) NOT NULL CHECK (l4Z_TM4m3 NOT LIKE '%[^a-zA-Z]%'), --- Validación para nombres
    n_ail VARCHAR(100) NOT NULL CHECK (n_ail LIKE '%_@__%.__%'), --- VALIDACIÓN DE CORREO
    m3rg3nzy__3m4il VARCHAR(100) NOT NULL CHECK (m3rg3nzy__3m4il LIKE '%_@__%.__%'), --- EL CORREO SI O SI DEBE TENER UNO DE ESOS SÍMBOLOS
    ppp3sswo_rd VARCHAR(100) NOT NULL CHECK (LEN(ppp3sswo_rd) >= 8), --- LA CONTRASEÑA DEBE DE SER MÍNIMO DE 8 CARÁCTERES
    _Pg_0Me VARCHAR(20) NOT NULL CHECK (_Pg_0Me LIKE '%[0-9]%'), --- SOLO ACEPTA NÚMEROS DE CELULAR
    lo_58role UNIQUEIDENTIFIER NOT NULL, --- NO ACEPTA NADA QUE NO SEA EL ID DE UN ROL 
    cr1ea5tiq123on_d__ate DATETIME NOT NULL DEFAULT GETDATE(),
    up352te_Dat32 DATETIME NOT NULL DEFAULT GETDATE()
);
```
```sql
USE passwords_contability_gestion;

ALTER TABLE us333rs_ 
ADD CONSTRAINT FK_ro00133_s FOREIGN KEY (lo_58role) REFERENCES ro6520l_e57s(rR0__l3_id);

--- INSERCIÓN DE LOS ROLES
INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('S123_D11_2', 'Permisos de super administrador');
INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('A3_mniN', 'Perminos de administrador');
INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('u_sser21_4', 'Permisos de usuario');
```
```sql
USE passwords_contability_gestion;

INSERT INTO us333rs_ (M4m3, l4Z_TM4m3, n_ail, m3rg3nzy__3m4il, ppp3sswo_rd, _Pg_0Me, lo_58role) VALUES ('Juan', 'Avila', 'juaasdf654@gmail.com', 'juaasdf654@gmail.com', 'miasddsf57656@', 3173856841, 'CAMBIARPORID'); -- AQUI VAS A CAMBIAR POR EL ID DEL ROL

--- MUESTRA LA INFORMACIÓN DE LOS USUARIOS REGISTRADOS
SELECT * FROM us333rs_;
```


# NOTAS
1. <b>Inserción de datos en SQL</b>: Si vas a insertar datos en la DB, no olvides que las consultas si o si deben ser realizadas con comillas simples, eso si se hace directamente desde un archivo ".sql" 

2. <b>IMPORTANTE:</b> Las tablas no pueden empezar por una mayúscula
<br>
<br>

# ERRORES
Alguno de los problemas que se pueden presentar, es que no podamos borrar la base de datos, para ello hay muchas formas de resolverlo, pero para mí, la más eficiente es la siguiente
```sql
USE master; -- Cambia a la base de datos master para liberar la que quieres eliminar
ALTER DATABASE Passwords_contability_gestion SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE Passwords_contability_gestion;
```

<b>En caso de que ocurra un error por los permisos del usuario "sa", puede ser por las siguientes causas</b>:
1. Verificar la constraseña en las configuraciónes de la base de datos en el archivo `src/utils/util.ts`
2. Verificar que el nombre de la base de datos sea el correcto

### <b>Si ninguna de las anteriores solucionó el error, hacer lo siguiente:</b>
1. Eliminar el contenedor donde se encuentra almacenada la base de datos
2. Volver a crear el servidor con el comando que se encuentra en el paso 2 de ``cómo correr el aplicativo``
3. Guardar la contraseña ya que la vamos a usar más adelante
4. usando la extención ``SQL SERVER`` vamos a crear una nueva conexión y vamos a ponerle el nombre que querramos, el host, vamos a marcar la casilla de  ``Trust server certificate``, elegimos la opción "SQL Login", ingresamos como nombre de usuario ``sa`` e introducimos la contraseña que habíamos guardado anteriormente. Opcional: marcar la casilla "save password" para guardar tu contraseña.
5. Habiendo generado la conexión, vamos a abrir la extensión que tiene el siguiente icono: ![alt text](./assets/image.png)

Luego de ello vamos a crear la base de datos de nuevo la base de datos dando click derecho donde dice "dev": ![alt text](./assets/image-1.png)

Puede que a ti te salga otro nombre, pero los pasos son los mismos.
Luego de ello vas a darle click en `NEW QUERY`
Donde se te va a llevar a un archivo SQL vacío.
Allí vas a volver a crear la base de datos según los pasos en ``"CREAR LA BASE DE DATOS"``