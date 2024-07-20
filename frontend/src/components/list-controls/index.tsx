import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ListControlsProps {
  setPage: (page: number) => void;
  page: number;
  limit: number;
  data: unknown[];
}

function ListControls({ setPage, page, data, limit }: ListControlsProps) {
  const changePageHandler = (action: string) => {
    if (action === "next") {
      setPage(page + 1);
    } else if (action === "previous") {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-row justify-around mb-2">
      <div className="flex">
        {page !== 1 ? (
          <button
            onClick={() => changePageHandler("previous")}
            className="px-2 py-1 bg-indigo-950 text-white rounded m-1 hover:bg-indigo-700 duration-300"
          >
            <FaArrowLeft />
          </button>
        ) : (
          <button
            onClick={() => changePageHandler("previous")}
            className="px-2 py-1 bg-zinc-600 opacity-50 text-white rounded m-1"
            disabled
          >
            <FaArrowLeft />
          </button>
        )}
        {data.length >= limit ? (
          <button
            onClick={() => changePageHandler("next")}
            className="px-2 py-1 bg-indigo-950 text-white rounded m-1 hover:bg-indigo-700 duration-300"
          >
            <FaArrowRight />
          </button>
        ) : (
          <button
            onClick={() => changePageHandler("next")}
            className="px-2 py-1 bg-zinc-600 text-white rounded m-1"
            disabled
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default ListControls;
