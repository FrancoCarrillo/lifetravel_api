import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersModule} from "./users/users.module";
import { ServicesModule } from "./services/services.module";

@Module({
  imports: [
    ServicesModule,
    UsersModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
