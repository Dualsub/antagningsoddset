import { GradeInfo } from "./types";

export default [
    {
        key: "bi",
        name: "BI",
        description: "Gymnasiebetyg",
        min: 0.0,
        max: 22.5,
    },
    {
        key: "bii",
        name: "BII",
        description: "Gymnasiebetyg med komplettering",
        min: 0.0,
        max: 22.5,
    },
    {
        key: "hp",
        name: "HP",
        description: "Högskoleprov",
        min: 0.0,
        max: 2.0,
    },
] as Array<GradeInfo>;