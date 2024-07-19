import { User } from "../entities/user";
import parseCSV from "../helpers/parser";
import { IRepository } from "../interfaces/repository.interface";

export const uploadFileService = async (
  filepath: string,
  repository: IRepository,
  fs: any
) => {
  const fileRows = [] as (typeof User)[];
  let hasInvalidHeaders = false;
  let hasUndefinedValue = false;
  let finalResult = {
    result: "",
    message: "",
  };

  const parser = parseCSV(filepath);

  parser
    .on("data", (data) => {
      repository.deleteMany();

      const row = {
        name: data[0] as string,
        city: data[1] as string,
        country: data[2] as string,
        favorite_sport: data[3] as string,
      };

      if (!row.name || !row.city || !row.country || !row.favorite_sport) {
        hasUndefinedValue = true;
        return;
      }

      fileRows.push(row);
    })
    .on("end", async () => {
      if (!hasInvalidHeaders) {
        const expectedHeaders = [
          "name",
          "city",
          "country",
          "favorite_sport",
        ].map((header) => header.toLowerCase().trim());
        const extractedHeaders = Object.values(fileRows[0]).map((header) =>
          header.toLowerCase().trim()
        );
        if (
          !expectedHeaders.every((expectedHeader) =>
            extractedHeaders.some(
              (extractedHeader) => extractedHeader === expectedHeader
            )
          )
        ) {
          hasInvalidHeaders = true;
        }
      }

      if (hasInvalidHeaders) {
        console.log("error");
        finalResult.result = "failure";
        finalResult.message = "The CSV format is not supported.";
      } else if (hasUndefinedValue) {
        finalResult.result = "failure";
        finalResult.message = "The CSV has missing fields.";
      } else {
        finalResult.result = "success";
        finalResult.message = "The file was uploaded successfully.";

        fileRows.forEach((item, index) => {
          if (index > 0) {
            repository.addOne({
              id: index,
              name: item.name,
              city: item.city,
              country: item.country,
              favorite_sport: item.favorite_sport,
            });
          }
        });
      }
      fs.unlinkSync(filepath);
    });

  await new Promise((resolve) => parser.on("end", resolve));
  return finalResult;
};
