import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return await this.tasksService.updateTask(id, updateTaskDto);
  }

  @Patch(':id/reorder')
  async reorderTask(@Param('id') id: string) {
    return await this.tasksService.reorderTasks([id]);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }
}
