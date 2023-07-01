import { ErrorOutline, ErrorOutlineRounded, ErrorRounded, GitHub } from '@mui/icons-material';
import { GitHubLink } from './GithubLink';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <div className={"flex flex-col justify-center items-center mb-6 " + className}>
      <GitHubLink className="flex md:hidden mb-6" />
      <p className="text-gray-500 text-xs">
        &copy; 2023 <a className='inline hover:underline' href="mailto:simonsjoling@hotmail.com">Simon Sjöling.</a>
      </p>
    </div >
  );
};

export default Footer;