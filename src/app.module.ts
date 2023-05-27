import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
