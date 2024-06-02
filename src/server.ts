import express from "express";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import reportRouter from "./router";
import db from "./config/db";
import swaggerSpec from "./config/swagger";

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

//? READING DATA FROM FORM.
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/report", reportRouter);

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
