import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { Task } from './task';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteResult } from 'typeorm';
import { TASK_CONSTANTS } from '../constants';
import { DataSource } from 'typeorm';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private entityRepo: Repository<TaskEntity>,
    private dataSource: DataSource
  ) {}

  async insertOne(task: Task): Promise<Task> {
    const taskEntity = this.entityRepo.create(task); // 'create' method just creates an instance, it doesn't save it
    await this.entityRepo.save(taskEntity); // 'save' method inserts or updates an entity
    return new Task(taskEntity);
  }

  async getAll(): Promise<Task[]> {
    const entities = await this.entityRepo.find();
    return entities.map((entity) => new Task(entity)); // Convert entities to domain objects
  }

  async findOneById(id: string): Promise<Task | null> {
    const entity = await this.entityRepo.findOne({ where: { id: id } });
    return entity ? new Task(entity) : null;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task | null> {
    const existingTask = await this.entityRepo.findOne({ where: { id: id } });
    if (!existingTask) {
      return null;
    }
    // Assign the updated fields to the existing task
    Object.assign(existingTask, updateTaskDto);
    await this.entityRepo.save(existingTask);
    return new Task(existingTask);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.entityRepo.delete(id);
  }

  async findAllOrdered(): Promise<Task[]> {
    return this.entityRepo.find({
      order: {
        order: 'ASC',
      },
    });
  }

  async getMaxOrderValue(): Promise<number> {
    const result = await this.entityRepo
      .createQueryBuilder('task')
      .select('MAX(task.order)', 'maxOrder')
      .getRawOne();
    return result.maxOrder || 0;
  }

  async reorderTasks(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      for (let i = 0; i < ids.length; i++) {
        const newOrder = (i + 1) * TASK_CONSTANTS.GAP_SIZE;
        await transactionalEntityManager.update(TaskEntity, ids[i], {
          order: newOrder,
        });
      }
    });
  }

  async normalizeTaskOrder(): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      let currentOrder = 0;

      const tasks = await transactionalEntityManager.find(TaskEntity, {
        order: {
          order: 'ASC',
        },
      });

      for (const task of tasks) {
        currentOrder += TASK_CONSTANTS.GAP_SIZE;
        await transactionalEntityManager.update(TaskEntity, task.id, {
          order: currentOrder,
        });
      }
    });
  }
}
