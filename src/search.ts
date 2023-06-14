import programs from "../data/data.json";
import { SearchResult } from "./types";

const programNames = Object.keys(programs);
const uniqueLetters: Array<string> = Array.from(programNames.reduce((charSet, curr) => {
    new Array(curr.length)
        .map((_, i) => curr.charAt(i))
        .forEach(c => {
            charSet.add(c);
        });
    return charSet;
}, new Set<string>()));

const magnusSimilarity = (s1: string, s2: string): number => {
    const length = Math.min(s1.length, s2.length);

    let similarChars = 0;

    for (let i = 0; i < length; i++) {
        if (s1.charAt(i) == s2.charAt(i)) similarChars++;

    }

    console.log(similarChars);
    return similarChars;
    /*
    const vec = new Array(length).map((_, i) => Number(s1.charAt(i) === s2.charAt(i)));
    console.log(vec.length)
    const result = vec.reduce((prev, curr) => curr + prev, 0) / vec.length;
    console.log(result);
    return vec.length
return result;
*/
};

const simonSimilarity = (s1: string, s2: string): number => {
    const length = Math.min(s1.length, s2.length);
    const s1Vec: Array<number> = new Array(length).fill(0).map((_, i) => s1.charCodeAt(i));
    const s2Vec: Array<number> = new Array(length).fill(0).map((_, i) => s2.charCodeAt(i));

    const s1Length = Math.sqrt(s1Vec.reduce((sum, c) => sum + c * c, 0));
    const s2Length = Math.sqrt(s2Vec.reduce((sum, c) => sum + c * c, 0));

    const result = new Array(length).fill(0).reduce((sum, _, i) => {
        return sum + s1Vec[i] * s2Vec[i];
    }, 0) / (s1Length * s2Length);

    return result;
};
// Search for best matching program names.
export const findMatches = (query: string, maxNumMatches: number): Array<SearchResult> =>
    query !== "" ? programNames
        .map((programName) => [programName, simonSimilarity(programName.toLowerCase(), query.toLowerCase())])
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, Math.min(maxNumMatches, programNames.length))
        .map((s: [string, number]) => ({
            program: s[0],
            university: programs[s[0]].university
        })) : [];

