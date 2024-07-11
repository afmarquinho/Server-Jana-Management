// import { Sequelize } from "sequelize-typescript";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
// import Report from "../models/Report.model";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL2!, {
  models: [__dirname + "/../models/**/*.ts"],
  logging: false,
});

// const db = new Sequelize(process.env.DATABASE_URL!, {
//   dialect: "postgres",
//   //* LAS INSTRUCCIONES DE DIALECTOPTIONS, CIFRA LA BBD POR TEMAS DE SEGURIDAD, SIN ELLA TAMBIEN SE CREA LA BBDD PERO ES MEJOR CIFRARLAS.
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
//   models: [__dirname + "/../models/**/*.ts"], //*DE ESTA MANERA SE AÑADEN TODA LA CARPETA PARA QUE AÑADA LOS MODELOS AUTOMATICAMENTE
//   //* models: [Report] //* DE ESTA MANERA TENGO QUE AÑADIR CADA MODELO MANUALMENTE
// });

export default db;
