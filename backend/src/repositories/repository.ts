import database from "../config/database";

class Repository {
    protected readonly db: typeof database;
    protected readonly model: unknown;

    constructor(private readonly modelName: string, modelType: unknown) {
        this.db = database;
        this.model = modelType;
    }
    async findMany(): Promise<typeof this.model> {
        const data = await this.db(this.modelName) as typeof this.model; 
        return data;
    }

    async addOne(data: typeof this.model): Promise<void> {
        await this.db(this.modelName).insert(data);
    }
}

export default Repository;