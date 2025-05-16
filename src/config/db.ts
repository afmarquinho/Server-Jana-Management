// import { Sequelize } from "sequelize-typescript";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
// import Report from "../models/Report.model";

dotenv.config();

// const db = new Sequelize(process.env.DATABASE_URL!, {
//   models: [__dirname + "/../models/**/*"],
//   logging: false,
// });

const db = new Sequelize(process.env.DATABASE_URL! as string, {
  dialect: "postgres",

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Solo para entornos de desarrollo
    },
  },
  logging: false, // si no quieres ver logs de SQL
  models: [__dirname + "/../models/**/*.ts"],
});

export default db;
