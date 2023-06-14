import { GitHub } from "@mui/icons-material";

interface GitHubLinkProps {
    className?: string;
}

export const GitHubLink = ({ className }: GitHubLinkProps) => <>
    <a
        href="https://www.github.com/Dualsub/antagningsoddset"
        className={"w-min bg-white flex flex-row justify-center align-middle items-center rounded-main px-4 py-2 border-[1px] text-sm " + className}
    >
        <GitHub className="mr-2" />
        <p>Repository</p>
    </a>
</>;