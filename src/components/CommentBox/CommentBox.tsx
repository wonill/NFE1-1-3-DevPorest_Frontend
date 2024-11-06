import { useEffect, useState } from "react";
import { CommentBoxWrapper } from "./CommentBox.styles";
import { UserApiResType, UserProfileResType } from "../../types/api-types/UserType";
import userApi from "../../api";
import noImg from "../../assets/no_image.svg";
import { useNavigate } from "react-router-dom";

interface CommentBoxProps {
  content: string; // 댓글 내용
  userID: string; // 댓글 작성자 ID
  createdAt: string; // 생성 날짜
  isMyComment: boolean; // 댓 작성자와 로그인된 사용자가 동일한지
  onClickDelete?: () => void; // x 버튼 활성화된 경우 클릭시 댓글 삭제
}

const CommentBox: React.FC<CommentBoxProps> = ({
  content,
  userID,
  createdAt,
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
  const UTF2KOR = () => {
    const date = new Date(createdAt);
    return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  };

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
        <p className="writeTime">{UTF2KOR().slice(0, -3)}</p>
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
