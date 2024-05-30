import express from "express";
import colors from "colors";
import reportRputer from "./router";
import db from "./config/db";


// * CONNECT TO DATA BASE
const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.bgGreen("Connection to bbdd has been established successfully.")
    );
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed("'Unable to connect to the database."));
  }
};

connectDB();

const server = express();

//? READING DATA FROM FORM.
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use("/api/report", reportRputer);

export default server;
