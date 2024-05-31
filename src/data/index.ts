import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Datos eliminados correctamente");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};
if (process.argv[2] === "--clear") {
  clearDB();
}

//!NOTA
//? ESTA FUNCION SE CORRE CON EL COMANDO npm run db PARA VACIAR LA BBDD, NARMALMENTE SE USA PORQUE AL HACER LAS PRUEBAS LLENAMOS LA BBDD CON DATOS DE PRUEBA
//? CON NPM TEST, EJECUTA PRIMERO EL PRETEST, EN ESTE CASO LIMPIA PRIMERO LA BBDD Y LUEGO EJECUTA EL TEST. NO SE NECESITA USAR EL NPM RUN DB
