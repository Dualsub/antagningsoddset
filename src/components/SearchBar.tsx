import { GradeInfo, Grades } from "../types";
import gradesInfo from "../gradeInfo";
import programs from "../../data/data.json"

import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from "react";
import { SearchResults } from "./SearchResults";
import { HelpOutline } from "@mui/icons-material";
import gradeInfo from "../gradeInfo";
import { Help } from "./Help";

interface SearchBarProps {
  grades: Grades;
  setGrades: (grades: Grades) => void;
  program: string;
  setProgram: (program: string) => void;
  className?: string;
}

export const SearchBar = ({ grades, setGrades, setProgram, className, program }: SearchBarProps) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [displayedGrades, setDisplayedGrades] = useState<Grades>({ ...grades });

  useEffect(() => {
    if (program !== "") {
      console.log(program, programs[program])
      setQuery(programs[program].name);
    }
  }, [program]);

  const updateGrades = () => {
    const newGrades = gradeInfo.reduce((gradesAcc: Grades, gradeType: GradeInfo) => {
      gradesAcc[gradeType.key] = Math.min(Math.max(displayedGrades[gradeType.key], gradeType.min), gradeType.max) || null;
      return gradesAcc;
    }, Object.fromEntries(gradesInfo.map(grade => [grade.key, null])) as Grades);
    setGrades(newGrades);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateGrades();
  };

  return (
    <>
      <form className={"flex flex-col justify-center align-middle items-center " + className} onSubmit={handleSubmit}>
        <div className="grid grid-flow-row grid-cols-1 grid-rows-2 items-center text-sm gap-2 md:grid-flow-col md:grid-cols-2 md:grid-rows-1">
          <div
            ref={inputRef}
            className="w-full flex flex-row items-center justify-center border-[1px] rounded-main px-3 py-2 bg-white"
          >
            <input
              // style={{ borderBottomLeftRadius: open ? 0 : "0.5rem", borderBottomRightRadius: open ? 0 : "0.5rem" }}
              type="text"
              placeholder="Sök utbildning"
              className="w-full focus:outline-none px-2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(e.target.value !== "");
              }}
              onFocus={() => setOpen(query !== "")}
            // onBlur={() => setOpen(false)}
            />
            <Help explanation="Utbildning" />
          </div>
          <SearchResults
            inputRef={inputRef}
            query={query}
            open={open}
            onSelected={(programKey, _) => {
              setProgram(programKey);
              setOpen(false);
            }}
          />
          <div className="w-full flex flex-row border-[1px] rounded-main px-3 py-2 bg-white">
            <div className="w-full flex flex-row">
              {gradesInfo.map((grade) => (
                <>
                  <input
                    key={grade.key}
                    className="w-full px-2 last:border-r-0 border-r focus:outline-none"
                    type="text"
                    id={grade.key}
                    placeholder={`${grade.name}`}
                    value={displayedGrades[grade.key] || ""}
                    onChange={(e) => {
                      setDisplayedGrades({ ...displayedGrades, [grade.key]: e.target.value });
                    }}
                    onBlur={() => updateGrades()}
                  />
                </>
              ))}
            </div>
            <Help explanation="Betyg i olika urvalsgrupper. BI: Gymnasiebetyg, BII: Gymnasiebetyg med komplettering, HP: Högskoleprovet." />
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:shadow-md transition-all ease-in-out hover:scale-105 hover:bg-blue-800 font-medium rounded-main text-sm px-8 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 outline-none border-none mt-4">
          Hitta
        </button>
      </form>
    </>
  );
};
