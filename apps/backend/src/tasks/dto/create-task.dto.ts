// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDate()
  @IsOptional()
  readonly dueDate?: Date;
}
