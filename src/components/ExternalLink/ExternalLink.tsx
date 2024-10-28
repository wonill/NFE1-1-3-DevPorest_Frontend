import { StyledExternalLink } from "./ExternalLink.style";

interface ExternalLinkProps {
  imgType: number;
  link?: string;
}

const imgIconMap: { [key: number]: string } = {
  0: "github",
  1: "instagram",
  2: "blog",
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ imgType, link }) => {
  const iconSrc = `/src/assets/${imgIconMap[imgType]}.svg`;
  return (
    <StyledExternalLink
      href={link}
      hasLink={!!link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={iconSrc} alt={`${imgIconMap[imgType]}`} />
    </StyledExternalLink>
  );
};

export default ExternalLink;
