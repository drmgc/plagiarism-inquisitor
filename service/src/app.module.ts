import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { RedisModule } from '@liaoliaots/nestjs-redis'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AssignmentsService } from './assignments.service'
import { CheckContextsService } from './check-contexts.service'
import { CheckingService } from './checking.service'

import { AssignmentsController } from './assignments.controller'
import { CheckContextsController } from './check-contexts.controller'
import { CheckingController } from './checking.controller'

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        closeClient: true,
        readyLog: true,
        config: {
          url: configService.get('REDIS_URL'),
        },
      }),
    }),
  ],
  controllers: [
    AppController,
    AssignmentsController,
    CheckContextsController,
    CheckingController,
  ],
  providers: [
    AppService,
    AssignmentsService,
    CheckContextsService,
    CheckingService,
  ],
})
export class AppModule {

}
