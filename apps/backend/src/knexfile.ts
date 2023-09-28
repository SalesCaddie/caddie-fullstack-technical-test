import * as dotenv from 'dotenv'
import {Knex} from "knex";
import * as path from "path";

dotenv.config({path:path.join(__dirname,'../.env')})

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_ADDRESS,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_ADMIN_USERNAME,
    password: process.env.POSTGRES_ADMIN_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
  },
  migrations: {
    directory: "./__migrations__",
  },
} as Knex.Config;
