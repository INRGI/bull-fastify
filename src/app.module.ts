import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { queueConfig } from './config/queue.config';
import { MathModule } from './math/math.module';

@Module({
  imports: [queueConfig, MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
