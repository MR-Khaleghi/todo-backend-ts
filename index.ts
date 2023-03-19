import express, { Express, Request, Response } from 'express';

// instantiate express app
const app: Express = express();

//define server port
const port = 3200;

//create default route
app.get('/', (req: Request, res: Response) => {
  res.send('test');
});

app.listen(port);
