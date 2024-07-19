import { Express } from "express";
import { User } from "../entities/user";
import { findAll } from "./controller";
import { findUsersService } from "../services/users.service";
import UsersRepository from "../repositories/users.repository";

export const findAllUsersController = (app: Express, route: string) => {
  findAll(
    app, 
    route, 
    new UsersRepository, 
    User, 
    findUsersService
);
};

export const findUserbyIdController = (app: Express, route: string) => {
//   findAll(
//     app, 
//     route, 
//     new UsersRepository, 
//     User, 
//     findUsersService
// );
};
