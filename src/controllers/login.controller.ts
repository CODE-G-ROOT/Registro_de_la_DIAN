import { get_connection } from "../database/connection"
import sql from "mssql";
import { db_tables, user_fileds } from "../utils/util";
console.log(db_tables);

// import { user_fileds } from "../utils/util";

export const get_users = async (_req: any, res: any) => {
    try {
        const pool = await get_connection();

        const result = await pool?.request().query(`SELECT * FROM ${db_tables.users}`);
        res.json(result?.recordset)

    } catch (error:any) {
        res.status(500).json({
            status: 500,
            message: error.message, // QUEDA PENDIENTE HACER EL ARCHIVO DE LOS ERRORES
        });
    }
};

export const post_new_user = async (req: any, res: any) => {
    const pool = await get_connection();
    const { name, price, quantity, description } = req.body;
    const result = await pool?.request()
        .input("name", sql.VarChar, name )
        .input("lastname", sql.Int, price )
        .input("email", sql.Int, quantity )
        .input("email_r", sql.VarChar, description )
        .input("password", sql.VarChar, description )
        .input("phone", sql.Int, description )
        .input("id_role", sql.VarChar, description )
        .query(`INSERT INTO products (${user_fileds.name}, ${user_fileds.lastname}, ${user_fileds.email}, ${user_fileds.resource_email}, ${user_fileds.password}, ${user_fileds.phone}, ${user_fileds.role}) VALUES (@name, @lastname, @email, @email_r, @password, @phone, @id_role)`);
    
    res.send(result)
};


