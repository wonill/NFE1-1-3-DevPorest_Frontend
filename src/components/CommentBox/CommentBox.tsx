import { CommentBoxWrapper } from "./CommentBox.styles";

interface CommentBoxProps {
  name: string; // 댓 작성자 이름
  job: string;
  profileImg: string;
  writeTime: Date;
  commentText: string;
  isMyComment: boolean; // 댓 작성자와 로그인된 사용자가 동일한지
  onClick?: () => void; // x 버튼 활성화된 경우 클릭시 댓글 삭제
}

const CommentBox: React.FC<CommentBoxProps> = ({
  name,
  job,
  profileImg,
  writeTime,
  commentText,
  isMyComment,
  onClick,
}) => {
  const writeTime_str = `${writeTime.getFullYear()}/${writeTime.getMonth()}/${writeTime.getDate()} ${writeTime.getHours()}:${writeTime.getMinutes()}`;
  return (
    <CommentBoxWrapper>
      <div className="commentInfo">
        <img src={profileImg} alt="noimg" />
        <div className="infoWrap">
          <p className="name">{name}</p>
          <p className="job">{job}</p>
        </div>
      </div>
      <div className="textBox">
        <p>{commentText}</p>
        <p className="writeTime">{writeTime_str}</p>
      </div>

      {isMyComment ? (
        <i className="closeBtn" onClick={onClick}>
          x
        </i>
      ) : (
        ""
      )}
    </CommentBoxWrapper>
  );
};
export default CommentBox;
