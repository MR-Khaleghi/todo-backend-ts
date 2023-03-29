import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Task } from './src/tasks/tasks.entity';
// instantiate express app
const app: Express = express();
dotenv.config();

//parse request body
app.use(bodyParser.json());

// user cors install types as well
app.use(cors());

// create DB connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

//define server port
const port = process.env.PORT;

//create default route
app.get('/', (req: Request, res: Response) => {
  res.send('test');
});

AppDataSource.initialize()
  .then(() => {
    console.log('data source has been initialized');
    app.listen(port);
    console.log(`server started on port ${port}`);
  })
  .catch((err) => {
    console.error('Error during data source initialization', err);
  });
