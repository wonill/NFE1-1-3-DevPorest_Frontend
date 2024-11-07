import { useEffect, useRef, useState } from "react";
import { CommentBoxWrapper } from "./CommentBox.styles";
import { UserApiResType, UserProfileResType } from "../../types/api-types/UserType";
import userApi from "../../api";
import noImg from "../../assets/no_image.svg";
import pencil from "../../assets/pencil.svg";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

interface CommentBoxProps {
  _id: string; // 댓글 ID
  content: string; // 댓글 내용
  userID: string; // 댓글 작성자 ID
  createdAt: string; // 생성 날짜
  isMyComment: boolean; // 댓 작성자와 로그인된 사용자가 동일한지
  onClickDelete?: () => void; // x 버튼 활성화된 경우 클릭시 댓글 삭제
  onCommentAdded: () => void; // 댓글 리랜더링
}

const CommentBox: React.FC<CommentBoxProps> = ({
  _id,
  content,
  userID,
  createdAt,
  isMyComment,
  onClickDelete,
  onCommentAdded,
}) => {
  const [name, setName] = useState<string | undefined>("");
  const [job, setJob] = useState<string | undefined>("");
  const [profileImg, setProfileImage] = useState<string | undefined>(noImg);
  const [inputText, setInputText] = useState(content);
  const [isEditState, setIsEditState] = useState(false);
  const [alertText, setAlertText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
  const handleTextboxHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 10}px`; // 내용물 높이에 맞춤
    }
  };
  const onClickSave = () => {
    const saveComment = async () => {
      setIsEditState(false);
      try {
        console.log("comment수정", inputText);
        const response = await userApi
          .put(`comments/${_id}`, {
            json: {
              content: inputText,
            },
          })
          .json();
        setAlertText("댓글이 수정되었습니다.");
        setTimeout(() => setAlertText(""), 3000);
        onCommentAdded();
        console.log("comment수정", response);
        return response;
      } catch (error) {
        setAlertText("댓글 수정 중 오류 발생");
        setTimeout(() => setAlertText(""), 3000);
        onCommentAdded();
        console.error("댓글 수정 중 에러 발생:", error);
        // throw error;
      }
    };
    saveComment();
    setAlertText("");
  };

  const UTF2KOR = () => {
    const date = new Date(createdAt);
    return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // 페이지 로드 시 텍스트 박스 높이 조정
    handleTextboxHeight();
  }, [content]); // 댓글 내용이 바뀔 때마다 호출

  useEffect(() => {
    if (isEditState && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditState]);

  return (
    <CommentBoxWrapper>
      {alertText && <Alert text={alertText} />}
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
      <textarea
        ref={textareaRef}
        onInput={handleTextboxHeight}
        disabled={!isEditState}
        className="textBox"
        value={inputText}
        onChange={ev => setInputText(ev.target.value)}
      />
      <p className="writeTime">{UTF2KOR().slice(0, -3)}</p>

      {isMyComment ? (
        <div className="btnWrap">
          {isEditState ? (
            <div className="btnInnerWrap">
              <i className="saveBtn" onClick={onClickSave}>
                저장
              </i>
              <i
                className="cancelBtn"
                onClick={() => {
                  setAlertText("취소되었습니다.");
                  setTimeout(() => setAlertText(""), 3000);
                  setInputText(content);
                  setIsEditState(false);
                }}
              >
                취소
              </i>
            </div>
          ) : (
            <img src={pencil} className="editBtn" onClick={() => setIsEditState(true)} />
          )}
          <i className="closeBtn" onClick={onClickDelete}>
            x
          </i>
        </div>
      ) : (
        ""
      )}
    </CommentBoxWrapper>
  );
};
export default CommentBox;
