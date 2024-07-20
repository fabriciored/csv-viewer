import { createTableInDatabase } from "./../../scripts/createTableInDatabase";
import UsersRepository from "../../src/repositories/users.repository";
import { uploadFileService } from "../../src/services/files.service";
import { generateTestFiles } from "../scripts/generateFiles";
import { findUsersService } from "../../src/services/users.service";

test("findUsersService", async () => {
  generateTestFiles("minimal");
  await createTableInDatabase();
  const repository = new UsersRepository();
  await uploadFileService(
    "C:/Users/Fabricio/Desktop/Dev/Projetos/Main Projects/csv-viewer/backend/tests/mocks/files/minimal.csv",
    repository,
    require("fs")
  );
  expect(await findUsersService(repository)).toEqual([
    {
      id: 1,
      name: "John Doe",
      city: "New York",
      country: "USA",
      favorite_sport: "Basketball",
    },
    {
      id: 2,
      name: "Jane Smith",
      city: "London",
      country: "UK",
      favorite_sport: "Football",
    },
  ]);
});
