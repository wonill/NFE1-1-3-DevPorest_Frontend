import { StyledButton } from "./DetailPageButton.style";
import defaultHeartImg from "../../assets/default_heart.svg";
import activeHeartImg from "../../assets/active_heart.svg";
import shareImg from "../../assets/share.svg";
import exportPDFImg from "../../assets/export_pdf.svg";

interface DetailPageButtonProps {
  text: string;
  onClick: () => void;
  isLiked?: boolean;
}

const iconMap: { [key: string]: string } = {
  좋아요: defaultHeartImg,
  "좋아요(active)": activeHeartImg,
  공유하기: shareImg,
  "PDF로 내보내기": exportPDFImg,
};

const DetailPageButton: React.FC<DetailPageButtonProps> = ({ text, onClick, isLiked = false }) => {
  return (
    <StyledButton onClick={onClick} text={text} isLiked={isLiked}>
      <div>
        <img src={isLiked ? iconMap["좋아요(active)"] : iconMap[text]} alt={text} />
      </div>
      <p>{text}</p>
    </StyledButton>
  );
};

export default DetailPageButton;
