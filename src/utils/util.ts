import dotenv from "dotenv";

dotenv.config();

const { SERVER_CONFIG, DB_SETTTINGS, DB_TABLES, DB_FILEDS_TABLE1, DB_FILEDS_TABLE2, ROLES1, ROLES2, ROLES3 } = process.env;

export const rol_fileds = JSON.parse(DB_FILEDS_TABLE1!);
export const user_fileds = JSON.parse(DB_FILEDS_TABLE2!);
export const db_tables = JSON.parse(DB_TABLES!);
export const roles = [ROLES1, ROLES2, ROLES3];

export const {host, port} = JSON.parse(SERVER_CONFIG!);

export const db_option_settings = JSON.parse(DB_SETTTINGS!);



