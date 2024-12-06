import { get_connection } from "../database/connection"
import sql from "mssql";
import { 
    db_tables, 
    rol_fileds, 
    roles, 
    user_fileds,
    id_roles
} from "../utils/util";


// QUERY DE BÚSUQEDA DE USUARIOS
// TRAER A TODOS LOS USUARIOS PAGINADOS Y ORDENADOS POR FECHA
export const get_users = async (req: any, res: any) => {
    try {
        const pool = await get_connection();
        const { skip, limit, email } = req.query;
        const skipValue = parseInt(skip, 10) || 0;  // Si no es un número, usar 0
        const limitValue = parseInt(limit, 10) || 10;  // Si no es un número, usar 10
        
        const found_user = await pool?.request().query(`
            SELECT 
                CASE 
                    WHEN NOT EXISTS (
                        SELECT 1 
                        FROM ${db_tables.users}
                        WHERE n_ail = '${email}'
                    )
                    THEN 'Credenciales incorrectas'        
                    ELSE (
                        SELECT 
                            CASE
                                WHEN r.${rol_fileds.rol_name} = '${roles[0]}' THEN 'SUDO'
                                WHEN r.${rol_fileds.rol_name} = '${roles[1]}' THEN 'ADMIN'
                                WHEN r.${rol_fileds.rol_name} = '${roles[2]}' THEN 'USER'
                                ELSE 'UNKNOWN'
                            END AS role
                        FROM ${db_tables.roles} r
                        WHERE u.${user_fileds.role} = r.${rol_fileds.rol_id}
                    )
                END AS role
            FROM 
                ${db_tables.users} u
            WHERE 
                u.${user_fileds.email} = '${email}';
            `);

        console.log(found_user?.recordset[0].role);

        if (typeof(found_user?.recordset[0].role) != "string") return res.status(400).json({rol: "UNKOWN"})
        if (found_user?.recordset[0].role != "SUDO") return res.status(203).json({motive: "Not access"})
        
        const result = await pool?.request().query(`
            SELECT 
                ${user_fileds.user_id} AS id,
                ${user_fileds.name} AS name, 
                ${user_fileds.lastname} AS lastname, 
                ${user_fileds.email} AS email, 
                ${user_fileds.resource_email} AS resource_email, 
                ${user_fileds.phone} AS phone, 
                CASE 
                    WHEN ${rol_fileds.rol_name} = '${roles[0]}' THEN 'SUDO'
                    WHEN ${rol_fileds.rol_name} = '${roles[1]}' THEN 'ADMIN'
                    WHEN ${rol_fileds.rol_name} = '${roles[2]}' THEN 'USER'
                    ELSE 'UNKNOWN'
                END AS role,
                u.${user_fileds.creation_date} AS creation_date, 
                u.${user_fileds.update_date} AS update_date
            FROM ${db_tables.users} u
            LEFT JOIN ${db_tables.roles} r
                ON u.${user_fileds.role} = r.${rol_fileds.rol_id}
            ORDER BY u.${user_fileds.creation_date}
            OFFSET ${skipValue} ROWS
            FETCH NEXT ${limitValue} ROWS ONLY;
        `);
        res.json(result)

    } catch (error:any) {
        res.status(500).json({
            status: 500,
            message: error.message, // QUEDA PENDIENTE HACER EL ARCHIVO DE LOS ERRORES
        });
    }
};

export const login_user = async (req:any, res:any) => {
    try {
        const pool = await get_connection();
        const { email, password } = req.body;
        const result = await pool?.request().query(`
            SELECT
            CASE 
                WHEN NOT EXISTS (
                    SELECT 1 
                    FROM ${db_tables.users} 
                    WHERE ${user_fileds.email} = '${email}'
                    AND ${user_fileds.password} = '${password}'
                )
                THEN 'Credenciales incorrectas'
                ELSE (
                    SELECT 
                        CASE 
                            WHEN r.${rol_fileds.rol_name} = '${roles[0]}' THEN 'SUDO'
                            WHEN r.${rol_fileds.rol_name} = '${roles[1]}' THEN 'ADMIN'
                            WHEN r.${rol_fileds.rol_name} = '${roles[2]}' THEN 'USER'
                            ELSE 'UNKNOWN'
                        END AS role
                    FROM 
                    ${db_tables.users} u
                LEFT JOIN 
                    ${db_tables.roles} r
                ON 
                    u.${user_fileds.role} = r.${rol_fileds.rol_id}
                WHERE 
                    u.${user_fileds.email} = '${email}' AND u.${user_fileds.password} = '${password}'
                )
            END AS Resultado;
    `)

    if (result?.recordset[0].Resultado === "Credenciales incorrectas") {
        return res.status(404).json("Credenciales Incorrectas")
    } 

    return res.json("Accept")

    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message, // QUEDA PENDIENTE HACER EL ARCHIVO DE LOS ERRORES
        });
    }
};

export const post_new_user = async (req: any, res: any) => {
    try {
        const pool = await get_connection();

    /* POR AHORA VAMOS A DEJAR QUE EL REGISTRO LO PUEDA HACER EL MISMO USUARIO
        PERO POR DEFECTO VA A TENER UN ROL DE USUARIO ASIGNADO A MENOS QUE EL SUDO LO CAMBIE
    */

        // Busca el id del rol 'usuario'
        const {name, lastname, email, email_r, password, phone} = req.body;

        const rol_user_id = await pool?.request().query(`
            SELECT ${rol_fileds.rol_id} FROM ${db_tables.roles} 
            WHERE ${rol_fileds.rol_name} = '${roles[2]}'
        `);

        // Realiza la solicitud para insertar el usuario con su rol en la DB
        const result = await pool?.request()
            .input("name", sql.VarChar, name)
            .input("lastname", sql.VarChar, lastname)
            .input("email", sql.VarChar, email)
            .input("email_r", sql.VarChar, email_r)
            .input("password", sql.VarChar, password)
            .input("phone", sql.BigInt, phone) // 
            .input("rol_id", sql.UniqueIdentifier, rol_user_id?.recordset[0].rR0__l3_id) // Desestrucutura e implementa el id del rol
            .query(`
                INSERT INTO ${db_tables.users} (   
                    ${user_fileds.name}, 
                    ${user_fileds.lastname}, 
                    ${user_fileds.email}, 
                    ${user_fileds.resource_email}, 
                    ${user_fileds.password}, 
                    ${user_fileds.phone}, 
                    ${user_fileds.role}
                ) 
                VALUES (@name, @lastname, @email, @email_r, @password, @phone, @rol_id)
            `); 

        //? EN LA BASE DE DATOS EL ROL POR DEFECTO ES EL DE USUARIOS
        console.log({result: result});

        (result?.rowsAffected) 
            ? res.json("accept") 
            : res.json("Alguno de los campos está mal")
                
    } catch (error: any) {
        console.log(error.message);

        switch (true) {
            case error.message.includes("trigger"):
                return res.status(400).json({ error: error.message });
            case error.message.includes("UNIQUE KEY"):
                return res.status(400).json({ error:  error.message.match(/The duplicate key.+/)[0] });
            default:
                return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
        }
        
    }
};




export const update_role = async (req: any, res: any) => {
    try {
        // const {name, lastname, email, email_to_change_, email_reourse, password, phone, role}
        // const { email, password, email_to_chage_role } = req.body;
        const { email, email_to_chage_role } = req.body;

        const pool = await get_connection();

        // VALIDA EL ROL  - SI ES SUDO 
        const query_validate_rol_user = `
            SELECT 
                CASE 
                    WHEN NOT EXISTS (
                        SELECT 1 
                        FROM ${db_tables.users}
                        WHERE n_ail = '${email}'
                    )
                    THEN 'Credenciales incorrectas'        
                    ELSE (
                        SELECT 
                            CASE
                                WHEN r.${rol_fileds.rol_name} = '${roles[0]}' THEN 'SUDO'
                                WHEN r.${rol_fileds.rol_name} = '${roles[1]}' THEN 'ADMIN'
                                WHEN r.${rol_fileds.rol_name} = '${roles[2]}' THEN 'USER'
                                ELSE 'UNKNOWN'
                            END AS role
                        FROM ${db_tables.roles} r
                        WHERE 
                            u.${user_fileds.role} = r.${rol_fileds.rol_id}
                    )
                END AS role
            FROM 
                ${db_tables.users} u
            WHERE 
                u.${user_fileds.email} = '${email}'`;
        
        const query_validate:any = await pool?.request().query(query_validate_rol_user)

        if (query_validate.recordset[0].role != "SUDO") return res.status(203).json("Not access")

        // return res.json("ok")

        //? ACTUALIZA A ADMIN
        // const validar_usertochange_exist = await pool?.request().query(`
        //     UPDATE ${db_tables.users} 
        //         SET 
        //             ${user_fileds.role} = '${id_roles[0]}' 
        //         WHERE 
        //             ${user_fileds.email} = '${email_to_chage_role}'
        // `)

        //? Actualiza a SUDO
        const validar_usertochange_exist = await pool?.request().query(`
            UPDATE ${db_tables.users} 
                SET 
                    ${user_fileds.role} = '${id_roles[1]}' 
                WHERE 
                    ${user_fileds.email} = '${email_to_chage_role}'
        `)

        //? Actualiza a USER
        // const validar_usertochange_exist = await pool?.request().query(`
        //     UPDATE ${db_tables.users} 
        //         SET 
        //             ${user_fileds.role} = '${id_roles[1]}' 
        //         WHERE 
        //             ${user_fileds.email} = '${email_to_chage_role}'
        // `)

        if (validar_usertochange_exist?.rowsAffected[0] != 1) return res.status(404).json("user not found")
            
        return res.json("ok")

    } catch (error: any) {
        console.log(error.message);
        
        res.status(500).json({
            status: 500,
            message: error.message, // QUEDA PENDIENTE HACER EL ARCHIVO DE LOS ERRORES
        });
    }
}