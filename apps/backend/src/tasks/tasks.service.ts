import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task';
import { TasksRepository } from './tasks.repository';
import { NotFoundException } from '@nestjs/common';
import { TASK_CONSTANTS } from '../constants';

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
    const maxOrder = await this.taskRepository.getMaxOrderValue();
    const newOrder = maxOrder + TASK_CONSTANTS.GAP_SIZE;

    const task = new Task({
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate: new Date(createTaskDto.dueDate),
      order: newOrder,
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
    const isNormalizationNeeded = this.isNormalizationNeeded;

    if (isNormalizationNeeded) {
      await this.taskRepository.normalizeTaskOrder();
    }

    await this.taskRepository.reorderTasks(ids);
  }

  // This can be changed to do lazy normalization
  async isNormalizationNeeded(): Promise<boolean> {
    const tasks = await this.taskRepository.findAllOrdered();

    // If there are no tasks or only one task, no need to normalize
    if (tasks.length <= 1) {
      return false;
    }

    // Check if the first task starts with an order value of GAP_SIZE
    if (tasks[0].order !== TASK_CONSTANTS.GAP_SIZE) {
      return true;
    }

    // Check the gaps between the order values
    for (let i = 0; i < tasks.length - 1; i++) {
      if (tasks[i + 1].order - tasks[i].order !== TASK_CONSTANTS.GAP_SIZE) {
        return true;
      }
    }

    // If all gaps are equal to GAP_SIZE, no normalization is needed
    return false;
  }
}
