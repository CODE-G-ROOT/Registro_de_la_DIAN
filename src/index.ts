import app from "./app";
import {host, port} from "./utils/util"; 

const hosting = host ?? "localhost"
const puerto = port ?? 4000

app.listen(puerto, hosting);



console.log(`Servidor corriendo: http://${host}:${port}`);
