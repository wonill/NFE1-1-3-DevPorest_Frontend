import { StatsWrapper } from "./LikesAndViews.style";
import viewImg from "../../assets/view.svg";
import likeImg from "../../assets/like.svg";

interface LikesAndViewsProps {
  views: number;
  likes: number;
}

const LikesAndViews: React.FC<LikesAndViewsProps> = ({ views, likes }) => {
  return (
    <StatsWrapper>
      <span>
        <img src={viewImg} alt="조회수" /> {views}
      </span>
      <span>
        <img src={likeImg} alt="좋아요" /> {likes}
      </span>
    </StatsWrapper>
  );
};

export default LikesAndViews;
