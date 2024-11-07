import { StatsWrapper } from "./LikesAndViews.style";
import viewImg from "../../assets/view.svg";
import likeImg from "../../assets/like.svg";
import commentImg from "../../assets/comment.svg";

interface LikesAndViewsProps {
  views: number;
  likes: number;
  comments: number;
}

const LikesAndViews: React.FC<LikesAndViewsProps> = ({ views, likes, comments }) => {
  return (
    <StatsWrapper>
      <span>
        <img src={viewImg} alt="조회수" /> {views}
      </span>
      <span>
        <img src={likeImg} alt="좋아요" /> {likes}
      </span>
      <span>
        <img src={commentImg} alt="" />
        {comments}
      </span>
    </StatsWrapper>
  );
};

export default LikesAndViews;
