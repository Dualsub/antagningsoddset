import { AnnualAddmissionStats, Grades, Program } from "./types";
import ecdfs from "../data/ecdfs.json";
import gradeInfo from "./gradeInfo";

export const calculateProbability = (grades: Grades, statistics: AnnualAddmissionStats): number => {
    return 1 - gradeInfo.reduce((invProb, gradeType) => {
        if (grades[gradeType.key] === null) {
            return invProb;
        }

        const grade = grades[gradeType.key] as number;
        const diff = grade - statistics[gradeType.key];

        // Find x closests to diff and get y value
        const probIdx = ecdfs[gradeType.key].x.reduce((acc, curr, i) => {
            if (Math.abs(curr - diff) < Math.abs(ecdfs[gradeType.key].x[acc] - diff)) {
                return i;
            }
            return acc;
        }, 0);
        return invProb * (1 - ecdfs[gradeType.key].y[probIdx]);
    }, 1);
};