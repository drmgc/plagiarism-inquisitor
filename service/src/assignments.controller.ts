import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common'

import { AssignmentsService } from './assignments.service'

import { CreateAssignmentDto } from './dto/create-assignment.dto'
import { AssignmentDto } from './dto/assignment.dto'

@Controller('/assignments')
export class AssignmentsController {
  constructor(
    private readonly service: AssignmentsService,
  ) { }

  @Get()
  async findAll(): Promise<AssignmentDto[]> {
    const ids = await this.service.findAllIds()
    return ids.map(k => ({ id: k }))
  }

  @Post()
  async create(
    @Body() contents: string,
  ): Promise<string> {
    return await this.service.add(contents)
  }

  @Get('/:id')
  async findContentById(
    @Param('id') id: string,
  ): Promise<string> {
    const content = await this.service.findContentById(id)
    if (!content) throw new NotFoundException(`Ответ {id} не найден`)
    return content
  }

  @Post('/:id')
  async createWithId(
    @Param('id') id: string,
    @Body() contents: string,
  ): Promise<string> {
    return await this.service.add(contents, id)
  }
}
