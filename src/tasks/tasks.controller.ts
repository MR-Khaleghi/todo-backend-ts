import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AppDataSource } from './../../index';
import { Task } from './tasks.entity';
import { Response, Request } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { UpdateResult } from 'typeorm';

class TasksController {
  // Method for get route
  public async getAll(req: Request, res: Response): Promise<Response> {
    //declare a var to hold all tasks
    let allTasks: Task[];

    //fetch all tasks using repository
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: { date: 'ASC' },
      });
      console.log(allTasks);
      //convert thetasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.json(allTasks).status(200);
    } catch (_error) {
      return res.json({ error: 'Internal server error' }).status(500);
    }
  }

  // Method for post route
  public async create(req: Request, res: Response): Promise<Response> {
    console.log('POST trigered');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // create a new instance of the Task
    const newTask = new Task();

    //add the required properties to the task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    // add the new task to the DB
    let createdTask: Task;
    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);
      // convert the task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;
      return res.json(createdTask).status(201);
    } catch (errors) {
      return res.json({ error: 'Internal server error' }).status(500);
    }
  }

  // Method for PUT route
  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try to find if the task exist
    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (errors) {
      return res.json({ error: 'Internal server error' }).status(500);
    }
    // return 400 if doesnot exist
    if (!task) {
      return res
        .status(404)
        .json({ error: 'The Task with given ID does not exist' });
    }

    // declare a variable for updatedTask
    let updatedTask: UpdateResult;
    // update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status })
      );
      //convert the updatedTask instance to an object
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;
      return res.json(updatedTask).status(200);
    } catch (errors) {
      return res.json({ error: 'Internal server error' }).status(500);
    }
  }
}

export const taskController = new TasksController();
