import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const database = knex({
  client: 'pg',
  connection: process.env.POSTGRES_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});


export default database;