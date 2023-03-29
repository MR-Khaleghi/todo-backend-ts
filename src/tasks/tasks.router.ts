import { Router, Response, Request } from 'express';

export const tasksRouter: Router = Router();

//create default route
tasksRouter.get('/tasks', (req: Request, res: Response) => {
  res.send('test');
});
