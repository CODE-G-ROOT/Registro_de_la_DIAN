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


### NOTAS
1. <b>Inserción de datos en SQL</b>: Si vas a insertar datos en la DB, no olvides que las consultas si o si deben ser realizadas con comillas simples, eso si se hace directamente desde un archivo ".sql" 
