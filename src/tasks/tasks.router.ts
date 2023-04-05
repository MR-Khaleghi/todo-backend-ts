import { TasksController } from './tasks.controller';
import { Router, Response, Request } from 'express';

export const tasksRouter: Router = Router();

//create default route
tasksRouter.get('/tasks', async (req: Request, res: Response) => {
  const tasksController = new TasksController();
  const allTasks = await tasksController.getAll();
  res.json(allTasks).status(200);

  //   res.send('test');
});
