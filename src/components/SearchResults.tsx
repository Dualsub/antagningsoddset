import { useEffect, useState } from "react";
import Popper from '@mui/base/Popper';
import { ArrowForwardIosRounded } from "@mui/icons-material";

import { findMatches } from "../search";
import { SearchResult } from "../types";

const MAX_MACTHES = 10;
const MIN_SEARCH_LENGTH = 3;
const SEARCH_DELAY = 200;


interface SearchResultsProps {
  query: string;
  inputRef: React.RefObject<HTMLInputElement>;
  open: boolean;
  onSelected: (programKey: string, programName) => void;
}

export const SearchResults = ({ query, inputRef, open, onSelected }: SearchResultsProps) => {

  const [results, setResults] = useState<Array<SearchResult>>([]);

  useEffect(() => {
    const getResults = async () => {
      setResults(findMatches(query, MAX_MACTHES));
      console.log("Ran Search")
    };

    const delayedQuery = setTimeout(() => {
      getResults();
    }, SEARCH_DELAY);

    return () => clearTimeout(delayedQuery);
  }, [query]);

  if (query === "" || !inputRef.current) {
    return null;
  }

  return <>
    <Popper
      autoFocus={true}
      anchorEl={inputRef.current}
      placement="bottom-start"
      style={{ zIndex: 1000, width: inputRef.current?.offsetWidth }}
      open={open}
      className="flex flex-col justify-center align-middle items-center text-sm border-[1px] border-t-0 rounded-lg bg-white">
      {results.map(({ programKey, programName, university }) => (<>
        <button
          className="w-full focus:outline-none flex flex-row items-center justify-between border-b-[1px] last:border-none px-4 py-2"
          onClick={() => {
            onSelected(programKey, programName);
          }}
          type="button"
          key={programKey}
        >
          <div className="flex flex-row justify-start text-left w-full">
            <p>{programName}</p>
            <p className="text-gray-400 ml-2">{university}</p>
          </div>
          <ArrowForwardIosRounded style={{ width: "0.8rem", height: "0.8rem" }} />
        </button>
      </>)
      )}
    </Popper>
  </>;

};
