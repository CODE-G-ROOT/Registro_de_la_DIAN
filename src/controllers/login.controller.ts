import { get_connection } from "../database/connection"
import sql from "mssql";
import { 
    db_tables, 
    rol_fileds, 
    roles, 
    user_fileds, 
} from "../utils/util";


// QUERY DE BÚSUQEDA DE USUARIOS
// TRAER A TODOS LOS USUARIOS PAGINADOS Y ORDENADOS POR FECHA
export const get_users = async (req: any, res: any) => {
    try {
        const pool = await get_connection();
        const {skip, limit} = req.query;
        const skipValue = parseInt(skip, 10) || 0;  // Si no es un número, usar 0
        const limitValue = parseInt(limit, 10) || 10;  // Si no es un número, usar 10

        console.log(roles);

// EJEMPLO: 
// ID: 6BD9698B-75E2-496F-923C-9EDC4A1E696F
// rol: 171AAAEA-968A-4B67-9EBD-22FFDBF6A1CF
        

        // PUBLICA EL RESULTADO
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
        res.json(result?.recordset)

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
            .input("rol_id", sql.UniqueIdentifier, Object.values(rol_user_id?.recordset[0])[0]) // Desestrucutura e implementa el id del rol
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


