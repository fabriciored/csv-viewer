import { Express } from "express";
import { User } from "../entities/user";
import { findAll, findAllWithSearchPaginated } from "./controller";
import { findUsersService, findUsersWithSearchPaginateService } from "../services/users.service";
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

export const findAllUsersWithSearchAndPaginationController = (app: Express, route: string) => {
  findAllWithSearchPaginated(
    app, 
    route, 
    new UsersRepository, 
    User, 
    findUsersWithSearchPaginateService
);
};

