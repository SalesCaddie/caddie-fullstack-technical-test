import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskRepository.findOneById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task({
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate: new Date(createTaskDto.dueDate), // Ensure proper date handling/conversion
    });
    await this.taskRepository.insertOne(task);
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Logic to update a task
  }

  async deleteTask(id: string): Promise<void> {
    // Logic to delete a task
  }

  async reorderTasks(id: string, position: number): Promise<void> {
    // Logic to reorder tasks
  }
}
