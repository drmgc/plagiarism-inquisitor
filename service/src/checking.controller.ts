import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common'

import { CheckingService } from './checking.service'

import { RequestCheckDto } from './dto/request-check.dto'

@Controller('/checking')
export class CheckingController {
  constructor(
    private readonly service: CheckingService,
  ) { }

  @Get()
  async findAll(): Promise<string[]> {
    return await this.service.findAllIds()
  }

  @Post()
  async requestCheck(
    @Body() contents: string,
    @Body() { assignmentId, contextId }: RequestCheckDto,
  ): Promise<string> {
    return await this.service.requestCheckAgainstContext({
      assignmentId, contextId,
    })
  }

  @Get('/:id')
  async findContentById(
    @Param('id') id: string,
  ): Promise<string> {
    const status = await this.service.findStatusById(id)
    if (!status) throw new NotFoundException(`Проверка {id} не найдена`)
    return status
  }
}
