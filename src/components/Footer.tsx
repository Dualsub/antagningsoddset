import { ErrorOutline, ErrorOutlineRounded, ErrorRounded, GitHub } from '@mui/icons-material';
import { GitHubLink } from './GithubLink';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <div className={"flex flex-col justify-center items-center mb-6 " + className}>
      <div className="flex items-center bg-blue-600 text-white text-sm px-4 py-3 mb-8 rounded-main" role="alert">
        <ErrorOutlineRounded className='mr-2' />
        <p className='font-bold'>Notera&nbsp;</p><p>att beräkande värden endast är&nbsp;</p><p className='font-bold'>estimat</p><p>.</p>
      </div>
      <GitHubLink className="flex md:hidden mb-6" />
      <p className="text-gray-500 text-xs">
        &copy; 2023 Simon Sjöling.
      </p>
    </div >
  );
};

export default Footer;