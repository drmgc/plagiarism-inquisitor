import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'

import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@liaoliaots/nestjs-redis'

export const KeyPrefix: string = 'plinq:assignment:'

@Injectable()
export class AssignmentsService {
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

  async findContentById(id: string): Promise<string|null> {
    const content = await this.redis.get(KeyPrefix + id)
    return content
  }

  async add(content: string, preferedId?: string): Promise<string> {
    const id = preferedId || await this.acquireId()
    this.redis.set(this.idToKey(id), content)
    return id
  }

  // Сгенерировать незанятый ID
  async acquireId(): Promise<string> {
    while (true) { // TODO: мб ограничить?
      const id = uuidv4()
      if ((await this.redis.keys(this.idToKey(id))).length == 0) {
        return id
      }
    }
  }
}
