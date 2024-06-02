import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
// import Report from "../models/Report.model";


dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  //* LAS INSTRUCCIONES DE DIALECTOPTIONS, CIFRA LA BBD POR TEMAS DE SEGURIDAD, SIN ELLA TAMBIEN SE CREA LA BBDD PERO ES MEJOR CIFRARLAS.
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  models: [__dirname + "/../models/**/*.ts"], //*DE ESTA MANERA SE AÑADEN TODA LA CARPETA PARA QUE AÑADA LOS MODELOS AUTOMATICAMENTE
  //* models: [Report] //* DE ESTA MANERA TENGO QUE AÑADIR CADA MODELO MANUALMENTE
  logging:false
});

export default db;
