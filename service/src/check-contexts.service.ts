import Redis from 'ioredis'

import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@liaoliaots/nestjs-redis'

export const KeyPrefix: string = 'plinq:context:'

@Injectable()
export class CheckContextsService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
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

  async findContextMembersById(id: string): Promise<string[]> {
    // TODO: делать проверку на существование?
    return await this.redis.lrange(this.idToKey(id), 0, -1)
  }

  async addToContext(contextId: string, assignmentId: string): Promise<number> {
    return await this.redis.lpush(this.idToKey(contextId), assignmentId)
  }

  async removeFromContext(contextId: string, assignmentId: string): Promise<number> {
    return await this.redis.lrem(this.idToKey(contextId), 0, assignmentId)
  }
}
