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

    async deleteMany(): Promise<void> {
        await this.db(this.modelName).del();
    }

    async findManyWithSearchPaginated(query: string, page: number, limit: number) {    
        return await this.db(this.modelName)
        .select('*')
        .where(function() {
          this.where('name', 'like', `%${query}%`)
            .orWhere('city', 'like', `%${query}%`)
            .orWhere('country', 'like', `%${query}%`)
            .orWhere('favorite_sport', 'like', `%${query}%`)
        })
        .offset((page - 1) * limit)
        .limit(limit);
      }
}

export default Repository;