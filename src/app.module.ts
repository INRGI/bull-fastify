import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { queueConfig } from './config/queue.config';
import { MathModule } from './math/math.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [queueConfig, MathModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
