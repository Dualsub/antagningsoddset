import { useEffect, useState } from "react";
import { AnnualAddmissionStats, Grades, Program } from "../types";
import programs from "../../data/data.json";
import gradeInfo from "../gradeInfo";

interface PopularTableProps {
  setLoading: (loading: boolean) => void;
  setProgram: (program: string) => void;
}

type PopularTableRow = {
  program: string;
  university: string;
} & AnnualAddmissionStats;

interface Column {
  key: string;
  name: string;
}

const COLUMNS = [
  {
    key: "program",
    name: "Utbildning"
  },
  {
    key: "university",
    name: "Universitet"
  },
  {
    key: "applicants",
    name: "Sökande",
  },
  ...gradeInfo.map(grade => ({
    name: grade.name,
    key: grade.key,
  })),
] as Array<Column>;

const YEAR = 2022;
const NUM_PROGRAMS = 10;

export const PopularTable = ({ setLoading, setProgram }: PopularTableProps) => {

  const [popularPrograms, setPopularPrograms] = useState<Array<PopularTableRow>>([]);

  useEffect(() => {
    setLoading(true);
    const getPopular = async () => {
      setPopularPrograms((Object.values(programs) as Array<Program>).sort((a, b) => {
        const sa = a.statistics.find(s => s.year === YEAR);
        const sb = b.statistics.find(s => s.year === YEAR);
        const biFactor = 700;
        if (sa && sb) return (sb.applicants + biFactor * sb.bi) - (sa.applicants + biFactor * sa.bi);
        if (!sa && sb) return 1;
        if (!sb && sa) return -1;

        return 0;
      }).slice(0, NUM_PROGRAMS).map(p => ({
        program: p.name,
        university: p.university,
        ...p.statistics.find(s => s.year === YEAR)
      })));

      setLoading(false);
    };

    getPopular();
  }, []);

  return <>
    <div className="w-full flex justify-center flex-col items-center">
      <h3 className="font-bold text-2xl mb-8">Mest populära ubildningarna {YEAR}</h3>

      <div className="overflow-x-auto rounded-xl border-[1px]">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase font-bold bg-white">
            <tr className="border-b">
              {COLUMNS.map(c => <th scope="col" className="px-6 py-3">{c.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {popularPrograms.map(p => <>
              <tr
                key={p.program}
                className="bg-white border-b last:border-none hover:bg-gray-50 whitespace-nowrap"
                onClick={() => {
                  setProgram(p.program);
                }}
              >
                {COLUMNS.map(c => <>
                  <td className="px-6 py-4 first:font-medium first:text-gray-900" key={p.program + "-" + c.key}>{p[c.key] || null}</td >
                </>)}
              </tr >
            </>)}
          </tbody>
        </table>
      </div>
    </div >
  </>;
};