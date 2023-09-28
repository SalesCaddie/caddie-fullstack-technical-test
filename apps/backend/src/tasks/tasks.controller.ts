import { Body, Controller, Get, Post } from '@nestjs/common';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll() {
    const tasks = await this.tasksService.getAllTasks();
    return { tasks };
  }

  @Post()
  async createTask(@Body() body: {title:string}) {
    const task = await this.tasksService.createTask(body.title);
    return { task };
  }
}
