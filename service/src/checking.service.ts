import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'

import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@liaoliaots/nestjs-redis'

import { AssignmentsService } from './assignments.service'
import { CheckContextsService } from './check-contexts.service'

export interface RequestCheckAgainstContextParams {
  readonly assignmentId: string
  readonly contextId: string
}

export const KeyPrefix: string = 'plinq:check:'

@Injectable()
export class CheckingService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly assignments: AssignmentsService,
    private readonly contexts: CheckContextsService,
  ) {}

  idToKey(id: string): string {
    return KeyPrefix + id
  }

  keyToId(key: string): string {
    return key.slice(KeyPrefix.length)
  }

  async findAllIds(): Promise<string[]> {
    const keys = await this.redis.keys(KeyPrefix + '*')
    return keys.map(this.keyToId)
  }

  async requestCheckAgainstContext({
    assignmentId,
    contextId,
  }: RequestCheckAgainstContextParams): Promise<string> {
    const id = uuidv4()
    this.redis.set(this.idToKey(id), 'pending')
    return id
  }

  async findStatusById(id: string): Promise<string|null> {
    const content = await this.redis.get(KeyPrefix + id)
    return content
  }
}
