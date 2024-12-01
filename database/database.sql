CREATE DATABASE passwords_contability_gestion;

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

--- TABLA DE USUARIOS
CREATE TABLE us333rs_(
    us333rs__id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    M4m3 VARCHAR(20) NOT NULL CHECK (M4m3 NOT LIKE '%[^a-zA-Z]%'), --- Validación para nombres
    l4Z_TM4m3 VARCHAR(20) NOT NULL CHECK (l4Z_TM4m3 NOT LIKE '%[^a-zA-Z]%'), --- Validación para nombres
    n_ail VARCHAR(100) NOT NULL UNIQUE CHECK (n_ail LIKE '%_@__%.__%'), --- VALIDACIÓN DE CORREO
    m3rg3nzy__3m4il VARCHAR(100) NOT NULL UNIQUE CHECK (m3rg3nzy__3m4il LIKE '%_@__%.__%'), --- EL CORREO SI O SI DEBE TENER UNO DE ESOS SÍMBOLOS
    ppp3sswo_rd VARCHAR(100) NOT NULL CHECK (LEN(ppp3sswo_rd) >= 8), --- LA CONTRASEÑA DEBE DE SER MÍNIMO DE 8 CARÁCTERES
    _Pg_0Me VARCHAR(20) NOT NULL UNIQUE CHECK (_Pg_0Me LIKE '%[0-9]%'), --- SOLO ACEPTA NÚMEROS DE CELULAR
    lo_58role UNIQUEIDENTIFIER NOT NULL DEFAULT '9022074c-e551-40da-b8aa-81f9bd048b25', --- NO ACEPTA NADA QUE NO SEA EL ID DE UN ROL 
    cr1ea5tiq123on_d__ate DATETIME NOT NULL DEFAULT GETDATE(),
    up352te_Dat32 DATETIME NOT NULL DEFAULT GETDATE()
);

--- Llave foránea para los roles
ALTER TABLE us333rs_ 
ADD CONSTRAINT FK_ro00133_s FOREIGN KEY (lo_58role) REFERENCES ro6520l_e57s(rR0__l3_id);
