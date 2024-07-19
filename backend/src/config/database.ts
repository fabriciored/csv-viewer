import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: ':memory:',
  },
});



export default database;