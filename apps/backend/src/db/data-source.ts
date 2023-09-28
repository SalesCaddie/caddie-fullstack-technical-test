import "reflect-metadata"
import {DataSource} from "typeorm"
import * as dotenv from 'dotenv'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotenv.config();

export const dbConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_ADDRESS,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_ADMIN_USERNAME,
    password: process.env.POSTGRES_ADMIN_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    logging: false,
    synchronize: false,
    ssl: false,
    extra: {
     trustServerCertificate: true,
    },
}

const datasource = new DataSource(dbConfig)
export default datasource
