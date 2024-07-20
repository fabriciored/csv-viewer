import express, { Express } from "express";
import dotenv from "dotenv";
import { findAllUsersController, findAllUsersWithSearchAndPaginationController } from "./controllers/users.controllers";
import { uploadCsvFileController } from "./controllers/files.controller";
import { createTableInDatabase } from "../scripts/createTableInDatabase";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

createTableInDatabase()

uploadCsvFileController(app, "/api/files", 'file');
findAllUsersWithSearchAndPaginationController(app, "/api/users");

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

