import * as fs from "fs";

function generateCSV(data: string, filePath: string): void {
  fs.writeFileSync(filePath, data);
}

const validPath = "./tests/mocks/files/valid.csv";
const minimalValidPath = "./tests/mocks/files/minimal.csv";
const missingFieldsPath = "./tests/mocks/files/missingfields.csv";
const invalidHeadersPath = "./tests/mocks/files/invalidheaders.csv";

export function generateTestFiles(type: string) {
  switch (type) {
    case "valid":
      generateCSV(
        `name,city,country,favorite_sport
        John Doe,New York,USA,Basketball
        Jane Smith,London,UK,Football
        Mike Johnson,Paris,France,Tennis
        Karen Lee,Tokyo,Japan,Swimming
        Tom Brown,Sydney,Australia,Running
        Emma Wilson,Berlin,Germany,Basketball
            `,
        validPath
      );
      break;
    case "missingFields":
      generateCSV(
        `name,city,country,favorite_sport
        John Doe,New York,USA,
        ,London,UK,Football
        Mike Johnson,,France,Tennis
        Karen Lee,Tokyo,Japan,Swimming
        Tom Brown,Sydney,Australia,Running
        Emma Wilson,Berlin,,Basketball
            `,
        missingFieldsPath
      );
      break;
    case "invalidHeaders":
      generateCSV(
        `nome,city,coauntry,least_favorite_sport
        John Doe,New York,USA,Basketball
        Jane Smith,London,UK,Football
        Mike Johnson,Paris,France,Tennis
        Karen Lee,Tokyo,Japan,Swimming
        Tom Brown,Sydney,Australia,Running
        Emma Wilson,Berlin,Germany,Basketball
            `,
        invalidHeadersPath
      );
      break;
    case "minimal":
      generateCSV(
        `name,city,country,favorite_sport
John Doe,New York,USA,Basketball
Jane Smith,London,UK,Football
            `,
        minimalValidPath
      );
      break;
    default:
  }
}
