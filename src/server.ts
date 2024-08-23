import express, { Request, Response } from "express";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import db from "./config/db";
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import reportRouter from "./router/reportRouter";
import userRouter from "./router/userRouter";
import tenderRouter from "./router/tenderRouter";
import uploadRouter from "./router/uploadRouter";
import consecutiveRouter from "./router/consecutiveRouter";
import multer from "multer";
import path from "path";
import  fs  from "node:fs";

// * CONNECT TO DATA BASE
export const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    // console.log(
    //   colors.bgGreen("Connection to bbdd has been established successfully.")
    // );
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed("Unable to connect to the database."));
  }
};

connectDB();

const server = express();

const upload = multer({
  dest: "uploads/",
});

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL]; // Lista de orígenes permitidos
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite cookies
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

server.use("/api/uploads", upload.single("profilePicture"), uploadRouter)



server.use("/api/consecutives",consecutiveRouter );
server.use("/api/reports", reportRouter);
server.use("/api/users", userRouter);
server.use("/api/tenders", tenderRouter);

//? ENDPOINT PARA EL TEST
server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});


//Docs
// server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
