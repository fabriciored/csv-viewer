import { ChangeEvent, useEffect, useState } from "react";
import Datagrid from "./datagrid";
import { getPaginatedUsersSearch, uploadCSVFile } from "../../services/api";
import { User } from "../../entities/user";
import { FieldValues, useForm } from "react-hook-form";
import ListControls from "../list-controls";
import { successLog } from "../../loggers/success";
import { failureLog } from "../../loggers/failure";

function Dataview() {
  const [data, setData] = useState<User[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { register, handleSubmit } = useForm();
  const [page, setPage] = useState(1);

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    if (data.file[0] == null) {
      failureLog("Please select a file")
      return;
    }
    formData.append("file", data.file[0]);
    const response = await uploadCSVFile(formData)
    if (response.message == "The file was uploaded successfully.") {
      successLog(response.message)
      const searchResponse = await getPaginatedUsersSearch(searchQuery, page, 8);
      setData(searchResponse);
      setUploadSuccess(true);
      setShowFileInput(false);
    } else {
      failureLog(response.message)
    }
  };

  const handleSearchQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
  };

  const handleNewUpload = () => {
    setData([]);
    setUploadSuccess(false);
    setShowFileInput(!showFileInput);
  };

  useEffect(() => {
    const getUsers = async () => {
      if (uploadSuccess) {
        const response = await getPaginatedUsersSearch(searchQuery, page, 8);
        setData(response);
      }
    };
    getUsers();
    console.log(data.length)
  }, [uploadSuccess, searchQuery, page, data.length]);

  return (
    <div className="min-w-full px-1 sm:px-20">
      <div className="w-full h-10 my-2 flex justify-between">
        <input
          className="outline outline-1 sm:p-2 rounded"
          type="text"
          placeholder="Search"
          onChange={handleSearchQueryUpdate}
        />
        <ListControls setPage={setPage} page={page} limit={4} data={data} />
        <button
          onClick={() => handleNewUpload()}
          className={
            !showFileInput
              ? "outline outline-1 sm:py-2 px-4 rounded duration-300 text-xs"
              : "outline outline-1 sm:py-2 px-4 rounded duration-300 text-xs bg-gray-300"
          }
        >
          New file
        </button>
      </div>
      <div className="w-full flex flex-row justify-center">
        {showFileInput && data.length == 0 ? (
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input type="file" accept=".csv" {...register("file")} />
            <button
              type="submit"
              className="outline outline-1 py-0.5 px-2 my-1 rounded-sm hover:bg-gray-300 duration-300 sm:w-96"
            >
              Upload
            </button>
          </form>
        ) : null}
      </div>
      {data.length !== 0 ? (
        <Datagrid data={data} />
      ) : (
        <div className="text-center h-full p-10 flex flex-col items-center justify-center">
          <p>Upload your CSV file to see its data.</p>
        </div>
      )}
    </div>
  );
}

export default Dataview;
