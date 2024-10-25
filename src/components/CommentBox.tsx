import styled from "@emotion/styled";

interface CommentBoxProps {
  name: string; // 댓 작성자 이름
  job: string;
  profileImg: string;
  writeTime: Date;
  commentText: string;
  isMyComment: boolean; // 댓 작성자와 로그인된 사용자가 동일한지
  onClick?: () => void; // x 버튼 활성화된 경우 클릭시 댓글 삭제
}

export const CommentBoxWrapper = styled.div`
  & {
    border: 2px solid black;
    position: relative;
    padding: ${({ theme }) => theme.PADDINGS.SMALL};
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};

    margin: 0;
    box-sizing: border-box;
  }

  .commentInfo {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-bottom: 13px;
  }
  .commentInfo img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    margin-left: 10px;
  }

  .infoWrap * {
    margin: 0;
  }
  .infoWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .textBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
    padding: 0 ${({ theme }) => theme.PADDINGS.X_SMALL};
    min-height: 6rem;
  }
  .textBox .writeTime {
    color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
    text-align: end;
  }

  .closeBtn {
    color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
    position: absolute;
    right: 2.5rem;
    top: 1.5rem;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

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
