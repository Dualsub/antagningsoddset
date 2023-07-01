import { useCallback, useEffect, useMemo, useState } from "react";
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
import { AnimatedDice } from "./components/AnimatedDice";
import { StatisticsPlot } from "./components/StatisticsPlot";
import { PopularTable } from "./components/PopularTable";

const getLatestStatistics = (program: string): AnnualAddmissionStats => {
  const stats = programs[program].statistics;
  const latest = stats.reduce((prev, curr) => prev.year > curr.year ? prev : curr);
  return latest;
};

export const App = () => {

  const [grades, setGrades] = useState<Grades>(Object.fromEntries(gradesInfo.map(grade => [grade.key, null])) as any);
  const [program, setProgram] = useState<string>("");
  const [programMeta, setProgramMeta] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [possibleResult, setPossibleResult] = useState<number | null>(null);

  useEffect(() => {
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
    if (result > 0.9) return "mycket goda";
    else if (result > 0.7) return "goda";
    else if (result > 0.45) return "ganska goda";
    else return "mindre goda";
  };

  const renderContent = useCallback(() => {
    if (loading) {
      return <>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold animate-spin ease-in-out">🎲</h1>
        </div>
      </>;
    } else if (program !== "" && result !== null) {
      return <>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center text-center w-full">
            <h2 className="mb-4 text-3xl font-bold">{program}</h2>
            {programMeta && <h3 className="mb-4 text-xl font-bold">{programMeta.university}</h3>}
            <ProbabilityDisplay probability={result} className="mb-4" />
            <p>Du har {getChanceText()} chanser att bli antagen till {programMeta.name} vid {programMeta.university}.</p>
            {possibleResult && !!!grades.bii && possibleResult > 0.7 ? <>
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
          <div className="mt-4 w-full max-w-4xl">
            <StatisticsPlot statistics={programMeta.statistics} grades={grades} />
          </div>
        </div>
      </>;
    } else {
      return <>
        <div className="w-full flex">
          <PopularTable setLoading={setLoading} setProgram={setProgram} />
        </div>
      </>;
    }
  }, [loading, result, possibleResult, program, programMeta]);

  return <>
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="w-full flex flex-col">
        <div className="w-full bg-green-400 flex flex-col items-center">
          <div className="w-full flex flex-col items-end">
            <GitHubLink className="mt-8 mb-0 mr-4 lg:mr-16 md:flex hidden" />
          </div>
          <div className="flex flex-col items-center mb-14 mt-10 md:mt-6">
            <div className="text-4xl md:text-5xl font-bold flex flex-row">
              <AnimatedDice className="mr-4" />
              <h1 className="">Antagningsoddset</h1>
            </div>
            <p className="mt-6 px-8 text-center">Skriv in dina meriter och få reda på dina chanser att bli antagen till din drömutbildning.</p>
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
      <section className="flex flex-col items-center max-w-5xl w-full px-8 mt-6 mb-36">
        {renderContent()}
      </section>
      <Footer className="mt-auto" />
    </div>
  </>;
};