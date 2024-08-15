import express from "express";
import router from "./router/indexRouter";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

export default server;

/* 

// deberia usar transacciones para que no me queden credentials sueltas. 

// se crearon usuarios con credentials nulls // COMPROBAR

*/

/*              Errores:
// FALTA CAMBIAR LOS DATOS DE STATUS EN LA BD
Y CONTEMPLAR LOS CASOS QUE SEAN STATUS 500
*/

// Agregar getTaskByUserId
