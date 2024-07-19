import database from "../src/config/database";

export const createTableInDatabase = async () => {
    await database.schema.createTable('users', function (table) {
        table.increments('id');
        table.primary(['id'])
        table.unique('id')
        table.string('name');
        table.string('city');
        table.string('country');
        table.string('favorite_sport');
      }).then(() => {
        console.log('Table created successfully');
      }).catch(error => {
        console.error('Failed to create table:', error);
      });
}

 