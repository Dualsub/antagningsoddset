export interface Grades {
    bi: number | null;
    bii: number | null;
    hp: number | null;
}

export interface GradeInfo {
    key: string;
    name: string;
    description: string;
    min: number;
    max: number;
}

export interface AnnualAddmissionStats {
    bi: number;
    bii: number;
    hp: number;
    applicants: number;
    year: number;
    term: "HT" | "VT";
}

export interface Program {
    name: string;
    code: string;
    university: string;
    statistics: Array<AnnualAddmissionStats>;
}

export interface ECDF {
    x: Array<number>;
    y: Array<number>;
}

export interface ECDFs {
    bi: ECDF;
    bii: ECDF;
    hp: ECDF;
}
