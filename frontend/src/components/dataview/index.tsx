import { ChangeEvent, useEffect, useState } from "react";
import Datagrid from "./datagrid";

function Dataview() {
  const [data, setData] = useState([
    {
      id: `1`,
      name: `John Doe`,
      city: `New York`,
      country: `USA`,
      favoriteSport: `Basketball`,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && (event.target.files?.length as number) > 0) {
      const file = event.target.files[0] as File;
      console.log(file.type);
      if (file.type !== "text/csv") {
        alert("Only CSV files are allowed.");
        return;
      }
      setShowFileInput(false);
      alert(`Selected file: ${file.name}`);
    }
  };

  const [showFileInput, setShowFileInput] = useState(false);

  const handleSearchQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
  };

  useEffect(() => {}, [searchQuery, data]);

  return (
    <div className="min-w-full px-20">
      <div className="w-full my-2 flex justify-between">
        <input
          className="outline outline-1 p-2 rounded"
          type="text"
          placeholder="Search"
          onChange={handleSearchQueryUpdate}
        />
        <button
          onClick={() => {
            setData([]);
            setShowFileInput(!showFileInput);
          }}
          className={
            !showFileInput
              ? "outline outline-1 py-2 px-4 rounded duration-300"
              : "outline outline-1 py-2 px-4 rounded duration-300 bg-gray-300"
          }
        >
          Upload
        </button>
      </div>
      {showFileInput && data.length == 0 ? (
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: "block", marginTop: "10px" }}
        />
      ) : null}
      {data ? (
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
