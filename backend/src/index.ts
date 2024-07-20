import express, { Express } from "express";
import dotenv from "dotenv";
import { findAllUsersWithSearchAndPaginationController } from "./controllers/users.controllers";
import { uploadCsvFileController } from "./controllers/files.controller";
import { createTableInDatabase } from "../scripts/createTableInDatabase";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(cors())
const port = process.env.PORT || 3000;

createTableInDatabase()

uploadCsvFileController(app, "/api/files", 'file');
findAllUsersWithSearchAndPaginationController(app, "/api/users");

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

