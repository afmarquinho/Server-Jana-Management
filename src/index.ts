import express from 'express';
import { Sequelize } from 'sequelize';
import server from './server';
import colors from "colors";

const app = express();
const port = process.env.PORT || 4000;

const sequelize = new Sequelize({
  database: 'database',
  dialect: 'postgres',
  username: 'username',
  password: 'password',
  storage: ':memory:',
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(colors.bold.bgBlue(`Server is running at http://localhost:${port} from index.ts`));
});
