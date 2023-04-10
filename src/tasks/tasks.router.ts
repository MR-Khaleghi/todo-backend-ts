import { createValidator, updateValidator } from './tasks.validator';
import { taskController } from './tasks.controller';
import { Router } from 'express';

export const tasksRouter: Router = Router();

//create default route
tasksRouter.get('/tasks', taskController.getAll);

tasksRouter.post('/tasks', createValidator, taskController.create);

tasksRouter.put('/tasks', updateValidator, taskController.update);
