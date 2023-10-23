import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { create } from 'domain';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/tasks.schema';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async findAll() {
        return this.taskModel.find();
    }

    async create(createTask: CreateTaskDTO) {
        const newTask = new this.taskModel(createTask);
        return newTask.save();
    }

    async findOne(id: string) {
        return this.taskModel.findById(id);
    }

    async deleteOne(id: string) {
        return this.taskModel.findByIdAndDelete(id);
    }

    async updateOne(id: string, task: UpdateTaskDTO) {
        return this.taskModel.findByIdAndUpdate(id, task, { new: true });
    }
}