import { StyledTag } from "./Tag.style";

interface TagProps {
  content: string;
  onClick?: (content: string) => void
}

const Tag: React.FC<TagProps> = ({ content, onClick }) => {
  const handleOnClick = () => {
    if (onClick) onClick(content);
  }
  return <StyledTag onClick={handleOnClick}>{content}</StyledTag>;
};

export default Tag;
