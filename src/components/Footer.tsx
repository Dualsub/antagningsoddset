import { GitHub } from '@mui/icons-material';
import { GitHubLink } from './GithubLink';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <div className={"flex flex-col justify-center items-center mb-8 " + className}>
      <p className="text-gray-500 text-xs">
        &copy; 2023 Simon Sjöling.
      </p>
    </div>
  );
};

export default Footer;