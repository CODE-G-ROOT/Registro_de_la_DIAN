import sql from "mssql";
import {db_option_settings} from "../utils/util";

const db_settings = {
    user: db_option_settings.user,
    password: db_option_settings.password,
    server: db_option_settings.server,
    database: db_option_settings.database,
    options: {
        encrypt: false, // ESTO SOLO APLICA AQUÍ POR QUE NO ESTÁ DESPLEGADO
        trustServerCertificate: true
    }
};

export const get_connection = async () => {
    try {
        const pool = await sql.connect(db_settings);
        console.log("the connections has been created");
        return pool;
    } catch (error) {
       return console.log(error);
    }
};