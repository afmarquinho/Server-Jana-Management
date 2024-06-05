import express from "express";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import reportRouter from "./router";
import db from "./config/db";
import swaggerSpec from "./config/swagger";
import cors, {CorsOptions} from "cors";

// * CONNECT TO DATA BASE
export const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.bgGreen("Connection to bbdd has been established successfully.")
    );
  } catch (error) {
    // console.log(error);
    console.log(colors.bgRed("Unable to connect to the database"));
  }
};

connectDB();

const server = express();


const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL]; // Lista de orígenes permitidos
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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

server.use("/api/report", reportRouter);

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
