import { StyledExternalLink } from "./ExternalLink.style";
import gitHubImg from "../../assets/github.svg";
import instagramImg from "../../assets/instagram.svg";
import blogImg from "../../assets/blog.svg";

interface ExternalLinkProps {
  imgType: number;
  link?: string;
}

const imgIconMap: { [key: number]: string } = {
  0: gitHubImg,
  1: instagramImg,
  2: blogImg,
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ imgType, link }) => {
  return (
    <StyledExternalLink href={link} hasLink={!!link} target="_blank" rel="noopener noreferrer">
      <img src={imgIconMap[imgType]} alt={`${imgIconMap[imgType]}`} />
    </StyledExternalLink>
  );
};

export default ExternalLink;
