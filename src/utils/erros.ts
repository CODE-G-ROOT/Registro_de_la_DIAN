//TODO: EN ESTE ARCHIVO SE VAN A ALMACENAR EL CONTROL DE ERRORES
export const error404 = (res: any) => {
    res.status(404).send({
        status: 404,
        message: "No se ha encontrado "
    })
}

// import { rol_fileds, user_fileds, db_tables } from "./util";

// const validate_error_server = (res:any, error:any) => {
//     // ESTE CODIGO VALIDA QUE NO SALGA NINGÚN DATO DELICADO COMO MENSAJE DE ERROR
//     if (["passwords_contability_gestion", "dbo"].some((term) => error.message.includes(term))) {
//         res.status(500).json({
//             status: 500,
//             message: "Ha ocurrido un error en el servidor",
//         });
//     }
    
//     else {
//         res.status(500).json({
//             status: 500,
//             message: error.message,
//         })
//     }
// }