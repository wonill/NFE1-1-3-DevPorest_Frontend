import { useEffect, useId, useState } from "react";
// import { CommentResType } from "../../types/api-types/CommentType";
import { CommentBoxWrapper } from "./CommentBox.styles";
import ky from "ky";
import { UserApiResType, UserProfileResType } from "../../types/api-types/UserType";
import userApi from "../../api";
const apiUrl = import.meta.env.VITE_SERVER_URL;
import noImg from "../../assets/no_image.svg";
import { Link, useNavigate } from "react-router-dom";

interface CommentBoxProps {
  // comment:CommentResType
  _id: string;
  content: string; // 댓글 내용
  userID: string; // 댓글 작성자 ID
  portfolioID: string; // 포트폴리오 ID
  createdAt: string; // 생성 날짜
  // name: string; // 댓 작성자 이름
  // job: string;
  // profileImg: string;
  // writeTime: Date;
  // commentText: string;
  isMyComment: boolean; // 댓 작성자와 로그인된 사용자가 동일한지
  onClickDelete?: () => void; // x 버튼 활성화된 경우 클릭시 댓글 삭제
}

const CommentBox: React.FC<CommentBoxProps> = ({
  // comment
  _id,
  content,
  userID,
  portfolioID,
  createdAt,
  // name,
  // job,
  // profileImg,
  // writeTime,
  // commentText,
  isMyComment,
  onClickDelete,
}) => {
  const [name, setName] = useState<string | undefined>("");
  const [job, setJob] = useState<string | undefined>("");
  const [profileImg, setProfileImage] = useState<string | undefined>(noImg);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await userApi.get(`users/user/${userID}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.log(userID, " 유저정보 찾을 수 없음");
          return;
        } else {
          throw new Error(`Failed to fetch user with status ${response.status}`);
        }
      }
      const jsonData: UserApiResType<UserProfileResType> = await response.json();

      setName(jsonData.data?.name);
      setProfileImage(jsonData.data?.profileImage);
      setJob(jsonData.data?.jobGroup);

      if (!jsonData.success) {
        throw new Error(`Server responded with ${jsonData.success}`);
      }
    } catch (err) {
      // console.error("상세 에러 정보:", err);
    }
  };
  const linkToProfile = () => {
    console.log("clicked");
    if (name) navigate(`/profile/${userID}`);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <CommentBoxWrapper>
      <div
        className="commentInfo"
        {...(name ? { onClick: linkToProfile, style: { cursor: "pointer" } } : {})}
      >
        <img src={profileImg} alt="noimg" />
        <div className="infoWrap">
          {/* user info(name)가 없다면 userID 보이기 */}
          <p className="name">{name ? name : userID}</p>
          <p className="job">{job}</p>
        </div>
      </div>
      <div className="textBox">
        <p>{content}</p>
        <p className="writeTime">{createdAt.slice(0, 16).replace("T", " ")}</p>
      </div>

      {isMyComment ? (
        <i className="closeBtn" onClick={onClickDelete}>
          x
        </i>
      ) : (
        ""
      )}
    </CommentBoxWrapper>
  );
};
export default CommentBox;
