import { CommentInputWrapper } from "./CommentInput.styles";
import Button from "../Button/Button";
import { useState } from "react";
import userApi from "../../api";

interface CommentInputProps {
  /* 로그인 안했다면 textarea, button 모두 비활성화 */
  isLoggedIn: boolean;
  portfolioID: string;
  onCommentAdded: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ portfolioID, isLoggedIn, onCommentAdded }) => {
  const [inputText, setInputText] = useState("");

  const onClickPost = () => {
    const postComment = async () => {
      try {
        console.log("comment등록", inputText);
        const response = await userApi
          .post(`comments/${portfolioID}`, {
            json: {
              content: inputText,
            },
          })
          .json();
        console.log("comment등록", response);
        onCommentAdded();

        return response;
      } catch (error) {
        console.error("댓글 등록 중 에러 발생:", error);
        throw error;
      }
    };
    postComment();
  };
  const onClick = (type: "post" | "cancel") => {
    if (type === "post" && onClickPost) onClickPost();
    setInputText("");
  };
  return (
    <CommentInputWrapper>
      <textarea
        placeholder={isLoggedIn ? "댓글을 작성해주세요" : "댓글을 작성하려면 로그인을 해주세요"}
        disabled={!isLoggedIn}
        className="textBox"
        value={inputText}
        onChange={ev => setInputText(ev.target.value)}
      />
      <div className="buttons">
        <Button
          text="댓글 작성"
          colorType={2}
          onClick={() => onClick("post")}
          isDisabled={!isLoggedIn}
        />
        <Button
          text="취소"
          colorType={1}
          onClick={() => onClick("cancel")}
          isDisabled={!isLoggedIn}
        />
      </div>
    </CommentInputWrapper>
  );
};
export default CommentInput;
