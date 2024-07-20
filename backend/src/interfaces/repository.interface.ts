export interface IRepository {
    findMany(): Promise<unknown>;
    findManyWithSearchPaginated(query: string, page: number, limit: number): Promise<unknown>;
    addOne(data: unknown): Promise<void>;
    deleteMany(): Promise<void>;
}