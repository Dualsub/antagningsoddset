import { Grades } from "../types";
import gradesInfo from "../gradeInfo";

interface SearchBarProps {
  grades: Grades;
  setGrades: (grades: Grades) => void;
  program: string;
  setProgram: (program: string) => void;
  programs: Array<string>;
}

export const SearchBar = ({ }: SearchBarProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };


  return (
    <>
      <form className="flex flex-col justify-center align-middle items-center max-w-4xl w-full" onSubmit={handleSubmit}>
        <div className="grid grid-flow-row grid-cols-1 grid-rows-2 items-center text-sm gap-2 md:grid-flow-col md:grid-cols-2 md:grid-rows-1">
          <div className="w-full flex flex-row items-baseline justify-center border-[1px] rounded-lg px-2 py-2">
            <input
              type="text"
              placeholder="Sök program"
              className="w-full px-2 focus:outline-none"
            />
          </div>
          <div className="w-full flex flex-row border-[1px] rounded-lg px-2 py-2">
            {gradesInfo.map((grade) => (
              <>
                <input
                  className="w-full px-2 last:border-r-0 border-r focus:outline-none"
                  type="text"
                  id={grade.key}
                  placeholder={`${grade.name} (${grade.description})`}
                />
              </>
            ))}
          </div>
          <button type="submit" className="md:h-full md:aspect-video text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 outline-none border-none">Sök</button>
        </div>
      </form>
    </>
  );
};
