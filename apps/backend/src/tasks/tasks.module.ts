import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbModule } from "../db/db.module";
import { TaskEntity } from "./task.entity";
import { TasksController } from "./tasks.controller";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forFeature([TaskEntity]),
    DbModule
  ],
  controllers: [TasksController],
  providers: [TasksService,TasksRepository],
})
export class TasksModule {}
