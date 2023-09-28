import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dbConfig}            from "./data-source";
@Module({
  imports: [
    TypeOrmModule.forRoot({...dbConfig, autoLoadEntities: true})
  ],
  exports: [],
  providers: [],
})
export class DbModule{}
