import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { Task } from './task';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DataSource } from 'typeorm';

const mockTasksRepository = {
  getAll: jest.fn(),
  findOneById: jest.fn(),
  updateTask: jest.fn(),
  insertOne: jest.fn(),
  deleteTask: jest.fn(),
  reorderTasks: jest.fn(),
} as unknown as TasksRepository; // Cast it to TasksRepository

describe('TasksService', () => {
  let service: TasksService;
  let repository: jest.Mocked<TasksRepository>; // Mocked version of TasksRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get(TasksRepository) as jest.Mocked<TasksRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const testTasks: Task[] = [
        new Task({
          id: '1',
          title: 'Test Task 1',
          description: 'Desc 1',
          dueDate: new Date(),
          order: 1,
        }),
      ];
      repository.getAll.mockResolvedValue(testTasks);

      const result = await service.getAllTasks();
      expect(result).toEqual(testTasks);
      expect(repository.getAll).toHaveBeenCalled();
    });
  });

  describe('getTaskById', () => {
    it('should retrieve a single task by id', async () => {
      const testTask: Task = new Task({
        id: '1',
        title: 'Test Task 1',
        description: 'Desc 1',
        dueDate: new Date(),
        order: 1,
      });
      repository.findOneById.mockResolvedValue(testTask);

      const result = await service.getTaskById('1');
      expect(result).toEqual(testTask);
      expect(repository.findOneById).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if task is not found', async () => {
      repository.findOneById.mockResolvedValue(undefined);

      await expect(service.getTaskById('non-existing-id')).rejects.toThrow(
        NotFoundException
      );
      expect(repository.findOneById).toHaveBeenCalledWith('non-existing-id');
    });
  });

  describe('updateTask', () => {
    it('should update a task if it exists', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Title' };
      const updatedTask: Task = new Task({
        id: '1',
        title: 'Updated Title',
        description: 'Desc 1',
        dueDate: new Date(),
        order: 1,
      });
      repository.updateTask.mockResolvedValue(updatedTask);

      const result = await service.updateTask('1', updateTaskDto);
      expect(result).toEqual(updatedTask);
      expect(repository.updateTask).toHaveBeenCalledWith('1', updateTaskDto);
    });

    it('should throw a NotFoundException if the task does not exist', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Title' };
      repository.updateTask.mockResolvedValue(undefined);

      await expect(
        service.updateTask('non-existing-id', updateTaskDto)
      ).rejects.toThrow(NotFoundException);
      expect(repository.updateTask).toHaveBeenCalledWith(
        'non-existing-id',
        updateTaskDto
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete the task if it exists', async () => {
      const taskId = 'some-id';
      repository.deleteTask = jest.fn().mockResolvedValue({ affected: 1 });

      await expect(service.deleteTask(taskId)).resolves.toBeUndefined();
      expect(repository.deleteTask).toHaveBeenCalledWith(taskId);
    });

    it('should throw a NotFoundException if the task does not exist', async () => {
      const taskId = 'some-id';
      repository.deleteTask = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(service.deleteTask(taskId)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
