import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";


dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL! as string, {
  dialect: "postgres",

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Solo para entornos de desarrollo
    },
  },
  native: true,
  logging: false, // si no quieres ver logs de SQL
  models: [__dirname + "/../models/**/*.{ts,js}"],

});

export default db;
