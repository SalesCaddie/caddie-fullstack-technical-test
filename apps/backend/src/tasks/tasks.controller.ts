import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

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
  async createTask(
    @Body() body: { title: string; description: string; dueDate: string }
  ) {
    const task = await this.tasksService.createTask(
      body.title,
      body.description,
      body.dueDate
    );
    return { task };
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
  }
}
