import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { queueConfig } from './config/queue.config';
import { MathModule } from './math/math.module';
import { AppService } from './app.service';

@Module({
  imports: [queueConfig, MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
