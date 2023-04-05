import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from './../../index';
import { Task } from './tasks.entity';

export class TasksController {
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {}
  public async getAll() {
    //declare a var to hold all tasks
    let allTasks: Task[];

    //fetch all tasks using repository
    try {
      allTasks = await this.taskRepository.find({ order: { date: 'ASC' } });
      console.log(allTasks);
      //convert thetasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];
      return allTasks;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
