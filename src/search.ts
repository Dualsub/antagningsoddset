import Fuse from "fuse.js";
import programs from "../data/data.json";
import { Program, SearchResult } from "./types";

type ProgramWithKey = Program & { key: string };

const programNames = Object.keys(programs);
const programValues = Object.entries(programs)
    .map((p) => ({ key: p[0] as string, ...p[1] as Program })) as Array<ProgramWithKey>;

console.log(programValues);

const options = {
    includeScore: false,
    isCaseSensitive: false,
    findAllMtaches: true,
    keys: ["name", "university"]
};

const fuse = new Fuse(programValues, options);

export const findMatches = (query: string, maxNumMatches: number): Array<SearchResult> =>
    query !== "" ? fuse.search<ProgramWithKey>(query)
        .slice(0, Math.min(maxNumMatches, programNames.length))
        .map((result: Fuse.FuseResult<ProgramWithKey>) => ({
            programKey: result.item.key,
            programName: result.item.name,
            university: result.item.university,
        })) : [];
