import { useState } from "react";
import { EditPortfolioPageWrapper } from "./EditPortfolioPage.styles";
import Tag from "../../components/Tag/Tag";
import Button from "../../components/Button/Button";
import TechStack from "../../components/TechStack/TechStack";
import ThumbnailInput from "./ThumbnailInput/ThumbnailInput";
import DropdownWithBtn from "../../components/Dropdown/DropdownWithBtn";
import MyCKEditor from "./MyCKEditor/MyCKEditor";
import { techStacks, jobs, dummyTags, dummyTechStacks } from "../../data/dummyData";
import TagInput from "./TagInput/TagInput";

const EditPortfolioPage = () => {
  const [previewThumbnail, setPreviewThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    saveChanges({ title: e.target.value, link });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    saveChanges({ title, link: e.target.value });
  };

  // 변경사항 저장 함수
  const saveChanges = (data: { title: string; link: string }) => {
    // debounce나 throttle을 적용하면 좋습니다
    // 예: 타이핑이 멈추고 500ms 후에 저장
    const timeoutId = setTimeout(() => {
      console.log("저장된 데이터:", data);
      // 여기에 실제 저장 로직 구현
      // 예: API 호출 등
    }, 500);
    // 컴포넌트가 언마운트되거나 다음 타이핑이 시작되면 이전 타이머 제거
    return () => clearTimeout(timeoutId);
  };

  return (
    <EditPortfolioPageWrapper>
      <div className="mw-900">
        <input
          className="input"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleTitleChange}
        />
        <div className="input">
          <ThumbnailInput setPreviewThumbnail={setPreviewThumbnail} />
        </div>
        {previewThumbnail ? (
          <img className="preview" src={previewThumbnail} alt="썸네일 미리보기" />
        ) : (
          ""
        )}
        <div className="input">
          <img src="/link-icon.svg" alt="link" />
          <input type="link" placeholder="https://example.com" onChange={handleLinkChange} />
        </div>

        <div className="input big">
          <DropdownWithBtn
            name="기술스텍"
            items={techStacks}
            placeholder="기술스텍을 입력해주세요."
          />
          {dummyTechStacks.map(techStack => (
            <TechStack key={techStack.skill} content={{ ...techStack }} onClick={() => {}} />
          ))}
          {/* <TechStackSwiper items={dummyTechStacks} /> */}
        </div>
        <div className="input big">
          <DropdownWithBtn name="직군" items={jobs} placeholder="직군을 입력해주세요." />
          {dummyTags.map(tag => (
            <Tag key={tag.content} {...tag} />
          ))}
        </div>
        <div className="editor">
          <MyCKEditor />
        </div>
        <div className="input ">
          <TagInput tags={tags} setTags={setTags} />
          {tags.map(tag => (
            <Tag content={tag} />
          ))}
        </div>

        <div className="submitBtn">
          <Button text="등록" colorType={3} />
        </div>
      </div>
    </EditPortfolioPageWrapper>
  );
};

export default EditPortfolioPage;
