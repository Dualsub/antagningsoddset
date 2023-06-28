import { useEffect, useState } from "react"
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
  {
    key: "admitted",
    name: "Antagna",
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
        if (sa && sb) return sb.applicants - sa.applicants;
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
      <h3 className="font-semibold text-xl mb-4">Mest populära program {YEAR}</h3>
      <div className="border-[1px] rounded-xl overflow-hidden">
        <table className="table-auto">
          <thead className="font-semibol bg-green-500">
            {COLUMNS.map(c => <th className="pl-6 last:px-6 pt-6 pb-4 first:text-left">{c.name}</th>)}
          </thead>
          <tbody>
            {popularPrograms.map(p => <>
              <tr key={p.program} className="border-t-[1px]">
                {COLUMNS.map(c => <>
                  <td className="pl-6 py-2 last:px-6" key={p.program + "-" + c.key} onClick={() => {
                    if (c.key === "program") {
                      setProgram(p.program);
                    }
                  }}>{p[c.key] || null}</td >
                </>)}
              </tr >
            </>)}
          </tbody>
        </table>
      </div>
    </div >
  </>
}