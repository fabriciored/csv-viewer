export interface IRepository {
    findMany(): Promise<unknown>;
    addOne(data: unknown): Promise<void>;
}