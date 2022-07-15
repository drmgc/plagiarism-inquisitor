import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'

import { CheckContextsService } from './check-contexts.service'

import { AddToCheckContextDto } from './dto/add-to-check-context.dto'

@Controller('/contexts')
export class CheckContextsController {
  constructor(
    private readonly service: CheckContextsService,
  ) { }

  @Get()
  async findAll(): Promise<string[]> {
    return await this.service.findAllIds()
  }

  @Post('/:id')
  async addToContext(
    @Param('id') contextId: string,
    @Body() { assignmentId }: AddToCheckContextDto,
  ): Promise<boolean> {
    await this.service.addToContext(contextId, assignmentId)
    return true
  }

  @Get('/:id')
  async findContextMembersById(
    @Param('id') id: string,
  ): Promise<string[]> {
    return await this.service.findContextMembersById(id)
  }
}
