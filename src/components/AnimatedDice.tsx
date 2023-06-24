import "../index.css";

interface AnimatedDiceProps {
    className?: string
};

export const AnimatedDice = ({ className }: AnimatedDiceProps) => <>
    <h1 className={"dice " + className || ""}>🎲</h1>
</>;
