import { get_connection } from "../database/connection"
import sql from "mssql";
import { 
    db_tables, 
    rol_fileds, 
    roles, 
    user_fileds, 
    // rol_fileds,
    // roles
} from "../utils/util";


// TRAER A TODOS LOS USUARIOS PAGINADOS Y ORDENADOS POR FECHA
export const get_users = async (req: any, res: any) => {
    try {
        const pool = await get_connection();
        const {skip, limit} = req.query;
        const skipValue = parseInt(skip, 10) || 0;  // Si no es un número, usar 0
        const limitValue = parseInt(limit, 10) || 10;  // Si no es un número, usar 10

        console.log(roles);
        
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

// export const get_user = async (req:any, res:any) => {
//     try {
//         const pool = await get_connection();
//         const { id, rol, email, phone, skip, limit } = req.query;

//         const result = undefined;

//         if (id) {
//             const result = await pool?.request().query(`SELECT ${user_fileds.id} from ${db_tables.users}`)    
//         }

        

//         const result = await pool?.request().query(`SELECT `)
//     } catch (error: any) {
        
//     }
// }

export const post_new_user = async (req: any, res: any) => {
    try {
        const pool = await get_connection();
        const {name, lastname, email, email_r, password, phone, id_role } = req.body;

        const result = await pool?.request()
            .input("name", sql.VarChar, name)
            .input("lastname", sql.VarChar, lastname)
            .input("email", sql.VarChar, email)
            .input("email_r", sql.VarChar, email_r)
            .input("password", sql.VarChar, password)
            .input("phone", sql.BigInt, phone) // Cambié a VARCHAR si usas `_Pg_0Me` como VARCHAR
            .input("id_role", sql.UniqueIdentifier, id_role)
            .query(`
                INSERT INTO ${db_tables.users} (${user_fileds.name}, ${user_fileds.lastname}, ${user_fileds.email}, ${user_fileds.resource_email}, ${user_fileds.password}, ${user_fileds.phone}, ${user_fileds.role}) VALUES (@name, @lastname, @email, @email_r, @password, @phone, @id_role)
            `);

        res.send(result)
                
    } catch (error: any) {
        //TODO: TOCA VALIDAR ESTO PARA QUE SALGAN LOS ERRORES, SIN EMABRGO QUE NO SE IMPRINA NADA DE LA BASE DE DATOS
        res.status(500).json({
            status: 500,
            message: "Ha ocurrido un error en el servidor",
        });
    }
};


