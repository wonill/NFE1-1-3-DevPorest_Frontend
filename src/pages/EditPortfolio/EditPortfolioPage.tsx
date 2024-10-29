import { useState } from "react";
import { EditPortfolioPageWrapper } from "./EditPortfolioPage.styles";
import Tag from "../../components/Tag/Tag";
import ThumbnailInput from "./ThumbnailInput/ThumbnailInput";
import DropdownWithBtn from "../../components/Dropdown/DropdownWithBtn";
import TechStackSwiper from "./TechStackSwiper";
import {
  techStacks,
  jobs,
  dummyTags,
  dummyTechStacks,
} from "../../data/dummyData";

const EditPortfolioPage = () => {
  const [previewThumbnail, setPreviewThumbnail] = useState<string>("");
  return (
    <EditPortfolioPageWrapper>
      <div className="mw-800">
        <input className="input" type="text" placeholder="제목을 입력하세요" />
        <div className="input">
          <ThumbnailInput setPreviewThumbnail={setPreviewThumbnail} />
        </div>
        {previewThumbnail ? (
          <img
            className="preview"
            src={previewThumbnail}
            alt="썸네일 미리보기"
          />
        ) : (
          ""
        )}
        <div className="input">
          <img src="/link-icon.svg" alt="link" />
          <input type="text" placeholder="외부링크 입력" />
        </div>

        <div className="input big">
          <DropdownWithBtn
            name="기술스텍"
            items={techStacks}
            placeholder="기술스텍을 입력해주세요."
          />
          <TechStackSwiper items={dummyTechStacks} />
        </div>
        <div className="input big">
          <DropdownWithBtn
            name="직군"
            items={jobs}
            placeholder="직군을 입력해주세요."
          />
          {dummyTags.map((tag) => (
            <Tag key={tag.content} {...tag} />
          ))}
        </div>
      </div>
    </EditPortfolioPageWrapper>
  );
};

export default EditPortfolioPage;
