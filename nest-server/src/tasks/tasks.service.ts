import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(filter?: string): Promise<Task[]> {
    const where = filter ? { status: filter === 'done' } : {};
    return this.tasksRepository.find({ where });
  }

  async create(taskData: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(taskData);
    return this.tasksRepository.save(newTask);
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, taskData);
    const updatedTask = await this.tasksRepository.findOneBy({ id });
    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    
    return updatedTask;
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}