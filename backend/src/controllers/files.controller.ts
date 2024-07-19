import { Express } from "express";
import { upload } from "./controller";
import { uploadFileService } from "../services/files.service";
import multer from "multer";
import UsersRepository from "../repositories/users.repository";
import fs from "fs";


export const uploadCsvFileController = (app: Express, route: string, filename: string) => {
const uploader = multer({ dest: 'tmp/csv/' })
  upload(
    app,
    route,
    uploader,
    filename,
    new UsersRepository,
    fs,
    uploadFileService
  );
};
