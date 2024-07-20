import { User } from "../entities/user";
import { IRepository } from "../interfaces/repository.interface";

export const findUsersService = async (repository: IRepository) => {
    const users = await repository.findMany() as typeof User[];
    return users;
}

export const findUsersWithSearchPaginateService = async (repository: IRepository, query: string, page: number, limit: number) => {
    const users = await repository.findManyWithSearchPaginated(query, page, limit) as typeof User[];
    return users;
}