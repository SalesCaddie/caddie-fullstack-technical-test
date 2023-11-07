import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task';
import { TasksRepository } from './tasks.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
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
    const updatedTask = await this.taskRepository.updateTask(id, updateTaskDto);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const deleteResult = await this.taskRepository.deleteTask(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
  }

  async reorderTasks(ids: string[]): Promise<void> {
    await this.taskRepository.reorderTasks(ids);
  }
}
