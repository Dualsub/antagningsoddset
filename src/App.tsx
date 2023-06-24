import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import gradesInfo from "./gradeInfo";
import { AnnualAddmissionStats, Grades } from "./types";
import { SearchBar } from "./components/SearchBar";
import Wave from "./../assets/waves.svg";
import { calculateProbability } from "./probability";
import gradeInfo from "./gradeInfo";
import { ProbabilityDisplay } from "./components/ProbabilityDisplay";
import programs from "../data/data.json";
import { GitHubLink } from "./components/GithubLink";
import { ProgramInfo } from "./components/ProgramInfo";
import { AnimatedDice } from "./components/AnimatedDice";

const mockGrades = {
  bi: 20,
  bii: 20,
  hp: 1,
} as Grades;

const mockStatistics = {
  bi: 20,
  bii: 20,
  hp: 1.5,
  applicants: 1000,
  term: "HT",
  year: 2020,
} as AnnualAddmissionStats;

const getLatestStatistics = (program: string): AnnualAddmissionStats => {
  const stats = programs[program].statistics;
  const latest = stats.reduce((prev, curr) => prev.year > curr.year ? prev : curr);
  return latest;
}

export const App = () => {

  const [grades, setGrades] = useState<Grades>(Object.fromEntries(gradesInfo.map(grade => [grade.key, null])));
  const [program, setProgram] = useState<string>("");
  const [programMeta, setProgramMeta] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    console.log(program, grades);
    if (program === "")
      return;

    setProgramMeta(programs[program]);

    const stats = getLatestStatistics(program);
    console.log(stats);
    const val = gradeInfo.some(grade => grades[grade.key] !== null) ? calculateProbability(grades, stats) : null;
    setResult(val);
  }, [program, grades]);

  const renderContent = () => {
    if (loading) {
      return <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold animate-spin ease-in-out">🎲</h1>
      </div>
    } else if (program !== "" && result !== null) {
      return <div className="flex flex-col justify-center items-center">
        <h2 className="mb-4 text-3xl font-bold">{program}</h2>
        {programMeta && <h3 className="mb-4 text-xl font-bold">{programMeta.university}</h3>}
        <ProbabilityDisplay probability={result} className="mb-4" />
        <p>Du har goda chanser att bli antagen till {programMeta.name} vid {programMeta.university}.</p>
        <ProgramInfo program={programMeta} />
      </div>;
    } else {
      return <>
      </>
    }
  };

  return <div className="bg-white">
    <div className="w-full mx-auto flex flex-col justify-start items-center min-h-screen">
      <div className="w-full flex flex-col justify-center">
        <div className="w-full bg-green-400 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-end">
            <GitHubLink className="mt-8 mr-16 md:flex hidden" />
          </div>
          <div className="flex flex-col justify-center items-center mb-12 mt-2">
            <h1 className="text-5xl font-bold flex flex-row">
              <AnimatedDice className="mr-4" />
              <h1 className="">Antagningsoddset</h1>
            </h1>
            <p className="mt-6">Skriv in dina meriter och få reda på dina chanser att bli antagen till din drömutbildning.</p>
          </div>
        </div>
        <Wave fill="#4ADE80" />
      </div>
      <section className="flex flex-col justify-start items-center w-full px-8 pb-0 mt-[-8.125rem]">
        <SearchBar
          program={program}
          setProgram={setProgram}
          grades={grades}
          setGrades={setGrades}
          className="mt-0 mb-6 max-w-4xl w-full"
        />
      </section>
      <section className="flex flex-col justify-center items-center max-w-7xl w-full px-8 mt-6 mb-36">
        {renderContent()}
      </section>
      <Footer className="mt-auto" />
    </div>
  </div>;
};