import { useState } from "react";
import Footer from "./components/Footer";
import gradesInfo from "./gradeInfo";
import { Grades } from "./types";
import { SearchBar } from "./component/SearchBar";

export const App = () => {

  const [grades, setGrades] = useState<Grades>(Object.fromEntries(gradesInfo.map(grade => [grade.key, null])));
  const [program, setProgram] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return <div className="bg-white">
    <div className="max-w-7xl w-full mx-auto flex flex-col justify-start items-center h-screen px-8">
      <h1 className="text-4xl font-bold my-8">🎲 Antagningsoddset</h1>
      <SearchBar
        programs={["Elektroteknik", "Farkostteknik"]}
        program={program}
        setProgram={setProgram}
        grades={grades}
        setGrades={setGrades} />
      <Footer />

    </div>
  </div>;
};