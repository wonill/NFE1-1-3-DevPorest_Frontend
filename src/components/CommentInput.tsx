import styled from "@emotion/styled";
import Button from "./Button";

interface CommentInputProps {
  /* 로그인 안했다면 textarea, button 모두 비활성화 */
  isLoggedin: boolean;

  onClickPost?: () => string; // 댓글 작성 버튼 클릭시
  onClickCancel?: () => void; // 취소 버튼 클릭시
}

export const CommentInputWrapper = styled.div`
  & {
    border: 2px solid black;
    position: relative;
    padding: ${({ theme }) => theme.PADDINGS.SMALL};
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};

    margin: 0;
    box-sizing: border-box;
  }

  .textBox {
    border: 1.5px solid transparent;
    min-height: 6rem;
    width: calc(100% - 2 * ${({ theme }) => theme.PADDINGS.X_SMALL});
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    text-overflow: wrap;
    overflow: hidden;
  }

  .textBox:focus {
    outline: 2px solid ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  }

  .buttons {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const CommentInput: React.FC<CommentInputProps> = ({
  isLoggedin,
  onClickPost,
  onClickCancel,
}) => {
  const onClick = (type: "post" | "cancel") => {
    // textarea 지워주기 (state로 관리)
    if (type === "post" && onClickPost) onClickPost();
    else if (type === "cancel" && onClickCancel) onClickCancel();
  };
  return (
    <CommentInputWrapper>
      <textarea
        placeholder={
          isLoggedin
            ? "댓글을 작성해주세요"
            : "댓글을 작성하려면 로그인을 해주세요"
        }
        disabled={!isLoggedin}
        className="textBox"
      />
      <div className="buttons">
        <Button
          text="댓글 작성"
          colorType={2}
          onClick={() => onClick("post")}
          isDisabled={!isLoggedin}
        />
        <Button
          text="취소"
          colorType={1}
          onClick={() => onClick("cancel")}
          isDisabled={!isLoggedin}
        />
      </div>
    </CommentInputWrapper>
  );
};
export default CommentInput;
