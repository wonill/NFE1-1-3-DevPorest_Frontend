import { StyledTag } from "./Tag.style";

interface TagProps {
  content: string;
  isActive?: boolean;
  onClick?: (content: string) => void;
}

const Tag: React.FC<TagProps> = ({ content, isActive, onClick }) => {
  const handleOnClick = () => {
    if (onClick) onClick(content);
  };
  return (
    <StyledTag onClick={handleOnClick} isActive={isActive!}>
      {content}
    </StyledTag>
  );
};

export default Tag;
