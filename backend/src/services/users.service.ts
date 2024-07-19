import { User } from "../entities/user";
import { IRepository } from "../interfaces/repository.interface";

export const findUsersService = async (repository: IRepository) => {
    const users = await repository.findMany() as typeof User[];
    return users;
}