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
import { StatisticsPlot } from "./components/StatisticsPlot";
import { PopularTable } from "./components/PopularTable";

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
};

export const App = () => {

  const [grades, setGrades] = useState<Grades>(Object.fromEntries(gradesInfo.map(grade => [grade.key, null])));
  const [program, setProgram] = useState<string>("");
  const [programMeta, setProgramMeta] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [possibleResult, setPossibleResult] = useState<number | null>(null);

  useEffect(() => {
    console.log(program, grades);
    if (program === "")
      return;

    setProgramMeta(programs[program]);

    const stats = getLatestStatistics(program);
    console.log(stats);
    const gradesAreValid = gradeInfo.some(grade => grades[grade.key] !== null);
    const val = gradesAreValid ? calculateProbability(grades, stats) : null;
    setResult(val);

    if (!!!grades.bii) {
      setPossibleResult(gradesAreValid ? calculateProbability({ bi: grades.bi, bii: grades.bi, hp: grades.hp }, stats) : null);
    }

  }, [program, grades]);

  const getChanceText = () => {
    if (result > 0.7) return "mycket goda";
    else if (result > 0.5) return "goda";
    else if (result > 0.3) return "ganska goda";
    else return "mindre goda";
  };

  const renderContent = () => {
    if (loading) {
      return <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold animate-spin ease-in-out">🎲</h1>
      </div>;
    } else if (program !== "" && result !== null) {
      return <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col justify-center items-center text-center w-full">
          <h2 className="mb-4 text-3xl font-bold">{program}</h2>
          {programMeta && <h3 className="mb-4 text-xl font-bold">{programMeta.university}</h3>}
          <ProbabilityDisplay probability={result} className="mb-4" />
          <p>Du har {getChanceText()} chanser att bli antagen till {programMeta.name} vid {programMeta.university}.</p>
          {possibleResult && possibleResult > 0.7 ? <>
            {/* I coudln't decide which one I liked the most, keeping the fire one outcommented for now */}
            {/* <a
              href="https://www.uhr.se/studier-och-antagning/tilltrade-till-hogskolan/Betygsurval/Betygskomplettering/"
              className="mt-6 border border-yellow-500 bg-yellow-50 rounded-xl text-yellow-900 px-4 py-3"
              role="alert"
              target="_blank"
            >
              <div className="flex flex-row">
                <div className="py-1 mr-2 text-2xl text-yellow-500">🔥</div>
                <div className="flex flex-col justify-start items-start">
                  <p className="font-bold">Hett råd!</p>
                  <p className="text-sm pr-1">
                    Du kan öka dina chanser till{" "}
                    <span className="font-bold text-green-500">
                      {Math.round(possibleResult * 100)}%
                    </span>{" "}
                    om du kompletterar endast ett gymnasiebetyg! Läs mer{" "}
                    <a href="#" className="font-semibold text-yellow-500">
                      här
                    </a>
                    .
                  </p>
                </div>
              </div>
            </a> */}
            <a
              href="https://www.uhr.se/studier-och-antagning/tilltrade-till-hogskolan/Betygsurval/Betygskomplettering/"
              className="mt-6 border-[1px] border-blue-500 bg-blue-50 rounded-xl text-blue-900 px-4 py-3"
              role="alert"
              target="_blank"
            >
              <div className="flex flex-row">
                <div className="py-1 mr-2 text-2xl text-blue-500">💎</div>
                <div className="flex flex-col justify-start items-start">
                  <p className="font-bold">Värdefullt råd!</p>
                  <p className="text-sm pr-1">
                    Du kan öka dina chanser till{" "}
                    <span className="font-bold text-green-500">
                      {Math.round(possibleResult * 100)}%
                    </span>{" "}
                    om du kompletterar endast ett gymnasiebetyg! Läs mer{" "}
                    <a href="#" className="font-semibold">
                      här
                    </a>
                    .
                  </p>
                </div>
              </div>
            </a>
          </> : null}

        </div>
        <div className="mt-4 w-full">
          <StatisticsPlot statistics={programMeta.statistics} grades={grades} />
        </div>
      </div>;
    } else {
      return <>
        <div className="w-full flex justify-center">
          <PopularTable setLoading={setLoading} setProgram={setProgram} />
        </div>
      </>;
    }
  };

  return <div className="bg-white w-full flex justify-center items-center">
    <div className="w-full flex flex-col justify-start items-center min-h-screen">
      <div className="w-full flex flex-col justify-center">
        <div className="w-full bg-green-400 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-end">
            <GitHubLink className="mt-8 mr-16 md:flex hidden" />
          </div>
          <div className="flex flex-col justify-center items-center mb-12 mt-2">
            <h1 className="text-4xl md:text-5xl font-bold flex flex-row">
              <AnimatedDice className="mr-4" />
              <h1 className="">Antagningsoddset</h1>
            </h1>
            <p className="mt-6">Skriv in dina meriter och få reda på dina chanser att bli antagen till din drömutbildning.</p>
          </div>
        </div>
        <Wave fill="#4ADE80" />
      </div>
      <section className="flex flex-col justify-start items-center px-8 pb-0 mt-[-10.75%] max-w-4xl w-full">
        <SearchBar
          program={program}
          setProgram={setProgram}
          grades={grades}
          setGrades={setGrades}
          className="mt-0 mb-6 w-full"
        />
      </section>
      <section className="flex flex-col justify-center items-center max-w-4xl w-full px-8 mt-6 mb-36">
        {renderContent()}
      </section>
      <Footer className="mt-auto" />
    </div>
  </div>;
};