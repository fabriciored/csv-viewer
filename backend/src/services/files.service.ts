import { User } from "../entities/user";
import parseCSV from "../helpers/parser";
import { IRepository } from "../interfaces/repository.interface";

export const uploadFileService = async (
  filepath: string,
  repository: IRepository,
  fs: any
): Promise<{ result: string; message: string }> => {
  const fileRows: (typeof User)[] = [];
  const expectedHeaders = ["name", "city", "country", "favorite_sport"];
  let headersChecked = false;

  try {
    const parser = parseCSV(filepath);

    parser.on("data", (data: string[]) => {
      if (!headersChecked) {
        const fileHeaders = data.map((header) => header.toLowerCase().trim());
        const hasInvalidHeaders = !expectedHeaders.every((expectedHeader) =>
          fileHeaders.includes(expectedHeader)
        );

        if (hasInvalidHeaders) {
          throw new Error("The CSV format is not supported.");
        }

        headersChecked = true;
        return;
      }

      if (
        data.length !== expectedHeaders.length ||
        data.some((field) => !field)
      ) {
        throw new Error("Missing fields in CSV data.");
      }

      const row: typeof User = {
        name: data[0],
        city: data[1],
        country: data[2],
        favorite_sport: data[3],
      };

      fileRows.push(row);
    });

    await new Promise((resolve, reject) => {
      parser.on("end", resolve);
      parser.on("error", reject);
    });

    if (fileRows.length === 0) {
      throw new Error("Empty or invalid CSV file.");
    }

    await repository.deleteMany();

    fileRows.forEach((row, index) => {
      repository.addOne({
        id: index + 1,
        name: row.name,
        city: row.city,
        country: row.country,
        favorite_sport: row.favorite_sport,
      });
    });

    return {
      result: "success",
      message: "The file was uploaded successfully.",
    };
  } catch (error: any) {
    return {
      result: "failure",
      message: error.message,
    };
  } finally {
    fs.unlinkSync(filepath);
  }
};
