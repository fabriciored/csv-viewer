import { createTableInDatabase } from "./../../scripts/createTableInDatabase";
import UsersRepository from "../../src/repositories/users.repository";
import { uploadFileService } from "../../src/services/files.service";
import { generateTestFiles } from "../scripts/generateFiles";
import { findUsersService } from "../../src/services/users.service";

test("findUsersService", async () => {
generateTestFiles("valid")
  await createTableInDatabase();
  expect(
    await uploadFileService(
      "C:/Users/Fabricio/Desktop/Dev/Projetos/Main Projects/csv-viewer/backend/tests/mocks/files/valid.csv",
      new UsersRepository(),
      require("fs")
    )
  ).toStrictEqual({
    message: "The file was uploaded successfully.",
    result: "success",
  });
});

test("Invalid CSV file (missing fields)", async () => {
    generateTestFiles("missingFields")
    expect(
      await uploadFileService(
        "C:/Users/Fabricio/Desktop/Dev/Projetos/Main Projects/csv-viewer/backend/tests/mocks/files/missingfields.csv",
        new UsersRepository(),
        require("fs")
      )
    ).toStrictEqual({
      message: "The CSV has missing fields.",
      result: "failure",
    });
  });

  test("Invalid CSV file (invalid headers)", async () => {
    generateTestFiles("invalidHeaders")
    expect(
      await uploadFileService(
        "C:/Users/Fabricio/Desktop/Dev/Projetos/Main Projects/csv-viewer/backend/tests/mocks/files/invalidheaders.csv",
        new UsersRepository(),
        require("fs")
      )
    ).toStrictEqual({
      message: "The CSV format is not supported.",
      result: "failure",
    });
  });
