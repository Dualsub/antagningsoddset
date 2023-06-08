import GithubLogo from '../../assets/github-mark.svg'

const Footer = () => {
  return (
    <div className="flex flex-col">
        <p>
            <GithubLogo />
        </p>
        <p className="text-gray-500 text-xs">
            &copy; 2023 Simon Sjöling. 
        </p>
    </div>
  )
}

export default Footer