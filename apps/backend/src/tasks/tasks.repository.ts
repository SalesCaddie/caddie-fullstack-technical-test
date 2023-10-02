import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';

export class TasksRepository {
  constructor(
    @InjectRepository(TaskEntity) private entityRepo: Repository<TaskEntity>
  ) {}

  async insertOne(task: Task): Promise<void> {
    const entity = new TaskEntity();
    entity.title = task.title;
    entity.description = task.description;
    entity.dueDate = task.dueDate;

    await this.entityRepo.insert(task);
  }

  async getAll(): Promise<Task[]> {
    const entities = await this.entityRepo.find();
    return entities.map(
      (entity) =>
        new Task({
          id: entity.id,
          title: entity.title,
          description: entity.description,
          dueDate: entity.dueDate,
        })
    );
  }

  async findOneById(id: string): Promise<Task | null> {
    const entity = await this.entityRepo.findOne({
      where: {
        id,
      },
    });
    if (!entity) return null;
    return new Task({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      dueDate: entity.dueDate,
    });
  }

  async deleteById(id: string): Promise<void> {
    const entity = await this.entityRepo.findOne({
      where: {
        id,
      },
    });
    await this.entityRepo.delete(entity);
  }
}
