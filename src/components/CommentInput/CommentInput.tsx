import { CommentInputWrapper } from "./CommentInput.styles";
import Button from "../Button/Button";

interface CommentInputProps {
  /* 로그인 안했다면 textarea, button 모두 비활성화 */
  isLoggedin: boolean;

  onClickPost?: () => string;
  onClickCancel?: () => void;
}

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
