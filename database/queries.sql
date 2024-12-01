--- INSERCIÓN DE LOS ROLES
USE passwords_contability_gestion;
-- INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('S123_D11_2', 'Permisos de super administrador');
-- INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('A3_mniN', 'Perminos de administrador');
-- INSERT INTO ro6520l_e57s (rR0__l3_M4m3, de_12scr1PAt_on) VALUES ('u_sser21_4', 'Permisos de usuario');

-- --- INSERCIÓN DE LOS USUARIOS
-- INSERT INTO us333rs_ (M4m3, l4Z_TM4m3, n_ail, m3rg3nzy__3m4il, ppp3sswo_rd, _Pg_0Me, lo_58role) VALUES ('Juan', 'Avila', 'juanavila8856@gmail.com', 'juanavila886@gmail.com', 'minionculion856@', 3173853166, '171aaaea-968a-4b67-9ebd-22ffdbf6a1cf');

--- MUESTRA LA INFORMACIÓN DE LOS USUARIOS REGISTRADOS
-- SELECT * FROM us333rs_;


-- ? ESTA SOLICITUD PERMITE AGREGARLE UN ALIAS A LA CONSULTA, CAMBIA CAMPOS POR SEGURIDAD Y ESTÁ PAGINADO POR OFFSET Y FETCH NEXT
-- SELECT 
--     u.us333rs__id AS id,
--     u.M4m3 AS name, 
--     u.l4Z_TM4m3 AS lastname, 
--     u.n_ail AS email, 
--     u.m3rg3nzy__3m4il AS resource_email, 
--     u._Pg_0Me AS phone, 
--     CASE 
--         WHEN r.rR0__l3_M4m3 = 'S123_D11_2' THEN 'SUDO'
--         WHEN r.rR0__l3_M4m3 = 'A3_mniN' THEN 'ADMIN'
--         WHEN r.rR0__l3_M4m3 = 'u_sser21_4' THEN 'USER'
--         ELSE 'UNKNOWN'
--     END AS role, -- Mapeo de valores personalizados
--     u.cr1ea5tiq123on_d__ate AS creation_date, 
--     u.up352te_Dat32 AS update_date
-- FROM us333rs_ u
-- LEFT JOIN ro6520l_e57s r
--     ON u.lo_58role = r.rR0__l3_id
-- ORDER BY u.cr1ea5tiq123on_d__ate
-- OFFSET 0 ROWS -- Omitir los primeros 10 registros (página 1)
-- FETCH NEXT 1 ROWS ONLY;

SELECT 
    u.us333rs__id AS id, 
    u.M4m3 AS name, 
    u.l4Z_TM4m3 AS lastname, 
    u.n_ail AS email, 
    u.m3rg3nzy__3m4il AS resource_email, 
    u._Pg_0Me AS phone,
    CASE 
        WHEN NOT EXISTS (
            SELECT 1 
            FROM us333rs_
            WHERE n_ail = '${email}'
            AND ppp3sswo_rd = '${password}'
        )
        THEN 'Credenciales incorrectas'        
        ELSE (
            SELECT 
                CASE
                    WHEN r.rR0__l3_M4m3 = 'S123_D11_2' THEN 'SUDO'
                    WHEN r.rR0__l3_M4m3 = 'A3_mniN' THEN 'ADMIN'
                    WHEN r.rR0__l3_M4m3 = 'u_sser21_4' THEN 'USER'
                    ELSE 'UNKNOWN'
                END AS role
            FROM ro6520l_e57s r
            WHERE u.lo_58role = r.rR0__l3_id
        )
    END AS role,
    u.cr1ea5tiq123on_d__ate AS creation_date, 
    u.up352te_Dat32 AS update_date
FROM 
    us333rs_ u
WHERE 
    u.us333rs__id = '4cd92316-3c4b-48cc-a938-c35588ef9b2c';
 -- <--- ?AQUI PONEMOS LA CONSULTA

--? TRAER INFO POR SOLO UN TIPO DE DATO
-- SELECT 
--     u.us333rs__id AS id, 
--     u.M4m3 AS name, 
--     u.l4Z_TM4m3 AS lastname, 
--     u.n_ail AS email, 
--     u.m3rg3nzy__3m4il AS resource_email, 
--     u.ppp3sswo_rd AS password, 
--     u._Pg_0Me AS phone, 
--     CASE 
--         WHEN r.rR0__l3_M4m3 = 'S123_D11_2' THEN 'SUDO'
--         WHEN r.rR0__l3_M4m3 = 'A3_mniN' THEN 'ADMIN'
--         WHEN r.rR0__l3_M4m3 = 'u_sser21_4' THEN 'USER'
--         ELSE 'UNKNOWN'
--     END AS role, 
--     u.cr1ea5tiq123on_d__ate AS creation_date, 
--     u.up352te_Dat32 AS update_date
-- FROM 
--     us333rs_ u
-- LEFT JOIN 
--     ro6520l_e57s r
-- ON 
--     u.lo_58role = r.rR0__l3_id
-- WHERE 
--     u.us333rs__id = '6bd9698b-75e2-496f-923c-9edc4a1e696f'; -- <--- AQUI PONEMOS LA CONSULTA


--? CANTIDAD DE USUARIOS POR ROL
-- SELECT 
--     CASE 
--         WHEN r.rR0__l3_M4m3 = 'S123_D11_2' THEN 'SUDO'
--         WHEN r.rR0__l3_M4m3 = 'A3_mniN' THEN 'ADMIN'
--         WHEN r.rR0__l3_M4m3 = 'u_sser21_4' THEN 'USER'
--         ELSE 'UNKNOWN'
--     END AS role, 
--     COUNT(*) AS user_count
-- FROM 
--     us333rs_ u
-- LEFT JOIN 
--     ro6520l_e57s r
-- ON 
--     u.lo_58role = r.rR0__l3_id
-- GROUP BY 
--     r.rR0__l3_M4m3;


--? USUARIOS CREADOS DENTRO DE UN RANGO DE FECHAS
-- SELECT 
--     u.us333rs__id AS id, 
--     u.M4m3 AS name, 
--     u.l4Z_TM4m3 AS lastname, 
--     u.n_ail AS email, 
--     u.cr1ea5tiq123on_d__ate AS creation_date
-- FROM 
--     us333rs_ u
-- WHERE 
--     u.cr1ea5tiq123on_d__ate BETWEEN '2024-01-01' AND '2024-12-31';


-- ACTUALIZAR UN ROL DE USUARIO
-- 1