import { StyledButton } from "./DetailPageButton.style";

interface DetailPageButtonProps {
  text: string;
  onClick: () => void;
  isLiked?: boolean;
}

const iconMap: { [key: string]: string } = {
  좋아요: "/src/assets/default_heart.svg",
  "좋아요(active)": "/src/assets/active_heart.svg",
  공유하기: "/src/assets/share.svg",
  "PDF로 내보내기": "/src/assets/export_pdf.svg",
};

const DetailPageButton: React.FC<DetailPageButtonProps> = ({
  text,
  onClick,
  isLiked = false,
}) => {
  return (
    <StyledButton onClick={onClick} text={text} isLiked={isLiked}>
      <div>
        <img
          src={isLiked ? iconMap["좋아요(active)"] : iconMap[text]}
          alt={text}
        />
      </div>
      <p>{text}</p>
    </StyledButton>
  );
};

export default DetailPageButton;
