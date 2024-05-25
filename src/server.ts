import express from "express";
import colors from 'colors'
import reportRputer from "./router";
import db from "./config/db";

// * CONNECT TO DATA BASE
const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgGreen("Conexion exitosa a la BBDD"));
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed("Hubo un error al conectar a la BBDD"));
  }
};

connectDB();

const server = express();

server.use("/api/report", reportRputer);

export default server;
