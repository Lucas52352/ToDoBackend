import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ConflictException,
    NotFoundException,
    HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const task = await this.taskService.findOne(id)

        if (!task) throw new NotFoundException('Task not found')

        return task
    }

    @Post()
    async create(@Body() body: CreateTaskDTO) {
        try {

            return await this.taskService.create(body);

        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Task Already Exists')
            }
            throw error
        }

    }

    @Delete(':id')
    // @HttpCode(204)
    async delete(@Param('id') id: string) {
        const task = await this.taskService.deleteOne(id)
        if (!task) throw new NotFoundException('Task not found')
        return `Task: ${task.title} deleted successfully`
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateTaskDTO) {
        console.log(id, body)
        const task = await this.taskService.updateOne(id, body)

        if (!task) throw new NotFoundException
        return `Task: ${task.title} updated successfully`
    }
}
