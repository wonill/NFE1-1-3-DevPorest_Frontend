import { StatsWrapper } from "./LikesAndViews.style";

interface LikesAndViewsProps {
  views: number;
  likes: number;
}

const LikesAndViews: React.FC<LikesAndViewsProps> = ({ views, likes }) => {
  return (
    <StatsWrapper>
      <span>
        <img src="../../assets/view.svg" alt="조회수" /> {views}
      </span>
      <span>
        <img src="../../assets/like.svg" alt="좋아요" /> {likes}
      </span>
    </StatsWrapper>
  );
};

export default LikesAndViews;
