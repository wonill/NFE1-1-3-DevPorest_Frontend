import { useState } from "react";
import { TagInputWrapper } from "./TagInput.styles";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tag, setTag] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      const newTag = tag.trim();
      if (!newTag.trim()) return;
      if (tags.includes(newTag)) {
        alert("이미 존재하는 태그입니다.");
        return;
      }
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTag("");
      }
    }
  };
  return (
    <TagInputWrapper>
      <img src="/hashtag-icon.svg" alt="#" />
      <input
        type="text"
        placeholder="태그"
        value={tag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </TagInputWrapper>
  );
};
export default TagInput;
