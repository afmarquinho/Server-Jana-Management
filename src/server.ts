import express, { Request, Response } from "express";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import reportRouter from "./router/reportRouter";
import userRouter from "./router/userRouter";
import tenderRouter from "./router/tenderRouter";
import uploadRouter from "./router/uploadRouter";
import consecutiveRouter from "./router/consecutiveRouter";
import multer from "multer";
import path from "path";
import fs from "node:fs";

// * CONNECT TO DATA BASE
export const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    // console.log(
    //   colors.bgGreen("Conexión establecida a la base de datos")
    // );
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed("Hubo un error al conectarse a la base de datos"));
  }
};

connectDB();

const server = express();

const upload = multer({
  dest: "uploads/",
});

//TODO: en producción actualizar los orignens permitidos de cross
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // const allowedOrigins = [
    //   process.env.FRONTEND_URL,
    // ];
    const allowedOrigins = process.env.FRONTEND_URL.split(",") || [];
    console.log(allowedOrigins)

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], // Añade cualquier encabezado personalizado aquí
  credentials: true,
  optionsSuccessStatus: 204,
};

//! NOTA
//? !origin SE USA PARA PERMITIR SOLICITUDES DESDE ENTORNOS DE SON DOMINIO COMO PAR PRUEBAS POR EJEMPLO DESDE POSTMAN, SI SE QUIERE SER MAS ESTRICTO, SE PUEDE QUIRAR !origin PARA PRODUCCIÓN

server.use(cors(corsOptions));

//? READING DATA FROM FORM.
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//* ROUTE TO ACCESS TO IMAGE FROM DIRECTORY
server.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

server.use("/api/uploads", upload.single("profilePicture"), uploadRouter);

server.use("/api/consecutives", consecutiveRouter);
server.use("/api/reports", reportRouter);
server.use("/api/users", userRouter);
server.use("/api/tenders", tenderRouter);

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
