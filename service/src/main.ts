import morgan from 'morgan'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(morgan('tiny'))
  await app.listen(3000)
}
bootstrap()
