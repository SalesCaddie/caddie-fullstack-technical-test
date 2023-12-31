import { Injectable } from '@nestjs/common';
import { Task } from "./task";
import { TasksRepository } from "./tasks.repository";

@Injectable()
export class TasksService {

  constructor(private readonly taskRepository: TasksRepository) {
  }
  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  async createTask(title: string): Promise<Task> {
    const task = new Task({
      title
    });
    await this.taskRepository.insertOne(task);
    return task;
  }
}
