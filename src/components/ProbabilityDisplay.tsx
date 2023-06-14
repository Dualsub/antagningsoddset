import { useEffect } from "react";
import { useSpring, animated } from "react-spring";

interface ProbabilityDisplayProps {
    probability: number;
    className?: string;
}

const getColor = (probability: number): { color: string, backgroundColor: string } => {
    if (probability < 0.3) {
        return { color: "#b91c1c", backgroundColor: "#f87171" };
    } else if (probability < 0.6) {
        return { color: "#ca8a04", backgroundColor: "#fde68a" };
    }
    return { color: "#15803d", backgroundColor: "#86efac" };
};

export const ProbabilityDisplay = ({ probability, className = "" }: ProbabilityDisplayProps) => {
    const springProps = useSpring({ displayProbability: probability, from: { displayProbability: 0 } });
    const color = getColor(probability);

    return (
        <div
            className={`flex flex-col justify-center items-center aspect-square w-32 rounded-full ` + className}
            style={{ backgroundColor: color.backgroundColor, color: color.color }}
        >
            <animated.h1 className="text-3xl font-bold text-center">
                {springProps.displayProbability.to((val: number) => Math.round(val * 100) + "%")}
            </animated.h1>
        </div >
    );
};
