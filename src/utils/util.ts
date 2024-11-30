import dotenv from "dotenv";

dotenv.config();

const { SERVER_CONFIG, DB_SETTTINGS, DB_FIELDS } = process.env;

export const {host, port} = JSON.parse(SERVER_CONFIG!);
export const db_settings = JSON.parse(DB_SETTTINGS!);
export const db_fields = JSON.parse(DB_FIELDS!);



