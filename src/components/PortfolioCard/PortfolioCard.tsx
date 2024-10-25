import LikesAndViews from "../LikesAndViews/LikesAndViews";
import {
  Card,
  ImgCon,
  ThumbnailImg,
  CardContent,
  TitleBox,
  Profile,
  ProfileImg,
  Name,
} from "./PortfolioCard.style";

interface PortfolioCardProps {
  title: string;
  thumbnailImg: string;
  profileImg: string;
  userName: string;
  views: number;
  likes: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  thumbnailImg,
  profileImg,
  userName,
  views,
  likes,
}) => {
  return (
    <Card>
      <ImgCon>
        <ThumbnailImg src={thumbnailImg} alt="Thumbnail" />
        <TitleBox className="title-box">
          <p>{title}</p>
        </TitleBox>
      </ImgCon>
      <CardContent>
        <Profile>
          <ProfileImg>
            <img src={profileImg} alt="profile" />
          </ProfileImg>
          <Name>{userName}</Name>
        </Profile>
        <LikesAndViews views={views} likes={likes} />
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
