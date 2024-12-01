
-- ESTA SOLICITUD PERMITE AGREGARLE UN ALIAS A LA CONSULTA, CAMBIA CAMPOS POR SEGURIDAD Y ESTÁ PAGINADO POR OFFSET Y FETCH NEXT
SELECT 
    u.us333rs__id AS id,
    u.M4m3 AS name, 
    u.l4Z_TM4m3 AS lastname, 
    u.n_ail AS email, 
    u.m3rg3nzy__3m4il AS resource_email, 
    u._Pg_0Me AS phone, 
    CASE 
        WHEN r.rR0__l3_M4m3 = 'S123_D11_2' THEN 'SUDO'
        WHEN r.rR0__l3_M4m3 = 'A3_mniN' THEN 'ADMIN'
        WHEN r.rR0__l3_M4m3 = 'u_sser21_4' THEN 'USER'
        ELSE 'UNKNOWN'
    END AS role, -- Mapeo de valores personalizados
    u.cr1ea5tiq123on_d__ate AS creation_date, 
    u.up352te_Dat32 AS update_date
FROM us333rs_ u
LEFT JOIN ro6520l_e57s r
    ON u.lo_58role = r.rR0__l3_id
ORDER BY u.cr1ea5tiq123on_d__ate
OFFSET 0 ROWS -- Omitir los primeros 10 registros (página 1)
FETCH NEXT 1 ROWS ONLY;


SELECT 
    ${user_fileds.user_id} AS id,
    ${user_fileds.name} AS name, 
    ${user_fileds.lastname} AS lastname, 
    ${user_fileds.email} AS email, 
    ${user_fileds.resource_email} AS resource_email, 
    ${user_fileds.phone} AS phone, 
    CASE 
        WHEN ${db_tables.roles}.${rol_fileds.rol_name} = ${roles[0]} THEN 'SUDO'
        WHEN ${db_tables.roles}.${rol_fileds.rol_name} = ${roles[1]} THEN 'ADMIN'
        WHEN ${db_tables.roles}.${rol_fileds.rol_name} = ${roles[2]} THEN 'USER'
        ELSE 'UNKNOWN'
    END AS role,
        ${user_fileds.creation_date} AS creation_date, 
        ${user_fileds.update_date} AS update_date
    FROM ${db_tables.users} u
    LEFT JOIN ${db_tables.roles} r
        ON u.${user_fileds.update_Date} = r.${rol_fileds.rol_id}
    ORDER BY u.${user_fileds.creation_date}
    OFFSET ${skip} 
    FETCH NEXT ${limit} ROWS ONLY;


-- TRAER INFO POR SOLO UN TIPO DE DATO
SELECT 
    u.us333rs__id AS id, 
    u.M4m3 AS name, 
    u.l4Z_TM4m3 AS lastname, 
    u.n_ail AS email, 
    u.m3rg3nzy__3m4il AS resource_email, 
    u.ppp3sswo_rd AS password, 
    u._Pg_0Me AS phone, 
    CASE 
        WHEN r.rR0__l3_M4m3 = 'S123_D11_2' THEN 'SUDO'
        WHEN r.rR0__l3_M4m3 = 'A3_mniN' THEN 'ADMIN'
        WHEN r.rR0__l3_M4m3 = 'u_sser21_4' THEN 'USER'
        ELSE 'UNKNOWN'
    END AS role, 
    u.cr1ea5tiq123on_d__ate AS creation_date, 
    u.up352te_Dat32 AS update_date
FROM 
    us333rs_ u
LEFT JOIN 
    ro6520l_e57s r
ON 
    u.lo_58role = r.rR0__l3_id
WHERE 
    u.us333rs__id = '6bd9698b-75e2-496f-923c-9edc4a1e696f'; -- <--- AQUI PONEMOS LA CONSULTA


-- CANTIDAD DE USUARIOS POR ROL
SELECT 
    CASE 
        WHEN r.rR0__l3_M4m3 = 'S123_D11_2' THEN 'SUDO'
        WHEN r.rR0__l3_M4m3 = 'A3_mniN' THEN 'ADMIN'
        WHEN r.rR0__l3_M4m3 = 'u_sser21_4' THEN 'USER'
        ELSE 'UNKNOWN'
    END AS role, 
    COUNT(*) AS user_count
FROM 
    us333rs_ u
LEFT JOIN 
    ro6520l_e57s r
ON 
    u.lo_58role = r.rR0__l3_id
GROUP BY 
    r.rR0__l3_M4m3;


-- USUARIOS CREADOS DENTRO DE UN RANGO DE FECHAS
SELECT 
    u.us333rs__id AS id, 
    u.M4m3 AS name, 
    u.l4Z_TM4m3 AS lastname, 
    u.n_ail AS email, 
    u.cr1ea5tiq123on_d__ate AS creation_date
FROM 
    us333rs_ u
WHERE 
    u.cr1ea5tiq123on_d__ate BETWEEN '2024-01-01' AND '2024-12-31';


-- ACTUALIZAR UN ROL DE USUARIO
UPDATE 
    us333rs_
SET 
    lo_58role = (SELECT rR0__l3_id FROM ro6520l_e57s WHERE rR0__l3_M4m3 = 'A3_mniN')
WHERE 
    us333rs__id = 'ID_DEL_USUARIO'; -- <--- QUI PONEMOS LA CONSULTA


-- ELIMINAR USUARIOS INNACTIVOS
DELETE FROM 
    us333rs_
WHERE 
    up352te_Dat32 < DATEADD(YEAR, -1, GETDATE());


-- BUSQUEDA DE USUARIOS POR NOMBRES SIMILARES
SELECT 
    u.us333rs__id AS id, 
    u.M4m3 AS name, 
    u.l4Z_TM4m3 AS lastname, 
    u.n_ail AS email
FROM 
    us333rs_ u
WHERE 
    u.M4m3 LIKE '%Juan%'; -- Cambiar "Juan" por la palabra a buscar