import { HelpOutline } from "@mui/icons-material"
import { Tooltip } from "@mui/material";

interface HelpProps {
    explanation: string;
}

export const Help = ({ explanation }: HelpProps) => {
    return <div className="flex flex-row items-center justify-center m-0 p-0">
        <Tooltip arrow title={explanation}>
            < HelpOutline className="text-blue-500 hover:text-blue-400" />
        </Tooltip>
    </div >;
};