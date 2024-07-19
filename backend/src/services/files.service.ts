import { User } from "../entities/user";
import parseCSV from "../helpers/parser";
import { IRepository } from "../interfaces/repository.interface";

export const uploadFileService = async (filepath: string, repository: IRepository, fs: any) => {
    const fileRows = [] as typeof User[];
    parseCSV(filepath)
      .on("data", (data) => {
        fileRows.push({
          name: data[0] as string,
          city: data[1] as string,
          country: data[2] as string,
          favorite_sport: data[3] as string
        });
      })
      .on("end", () => {
        fileRows.map((item, index) => {
          if (index > 0)
            repository.addOne({
            id: index,
            name: item.name,
            city: item.city,
            country: item.country,
            favorite_sport: item.favorite_sport
          })
        })
        fs.unlinkSync(filepath);     
      })
}