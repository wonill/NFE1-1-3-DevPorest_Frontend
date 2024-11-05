import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EditPortfolioPageWrapper } from "./EditPortfolioPage.styles";
import Tag from "../../components/Tag/Tag";
import Button from "../../components/Button/Button";
import TechStack from "../../components/TechStack/TechStack";
import ThumbnailInput from "./ThumbnailInput/ThumbnailInput";
import DropdownWithBtn from "../../components/Dropdown/DropdownWithBtn";
import MyCKEditor from "./MyCKEditor/MyCKEditor";
import TagInput from "./TagInput/TagInput";
import { PortfolioType } from "../../types/api-types/PortfolioType";
import { ITechStackType } from "../../types/api-types/TechStackType";
import { JobGroupType } from "../../types/api-types/JobGroup";
import { useTechStacksAndJobGroups } from "../../hooks/useTechStacksAndJobGroups";
import { createPortfolio } from "../../api/create-portfolio";

const EditPortfolioPage = () => {
  const navigate = useNavigate();
  const { techStackList, jobGroupList } = useTechStacksAndJobGroups();

  const [formData, setFormData] = useState<Partial<PortfolioType>>({
    title: "",
    contents: "",
    images: [],
    tags: [],
    techStack: [],
    thumbnailImage: "",
    jobGroup: "", // 여기에는 jobGroup._id가 저장됨
    links: [],
  });
  // 화면에 표시할 jobGroup.job을 위한 별도의 상태 -> post 요청 시에는 jobGroup._id를 사용
  const [displayJobGroup, setDisplayJobGroup] = useState<string>("");
  const [newLink, setNewLink] = useState<string>("");

  const handleInputChange = (field: keyof PortfolioType, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTechStackSelect = (techStack: ITechStackType) => {
    if (formData.techStack?.some((item) => item.skill === techStack.skill)) {
      alert("이미 추가된 기술스택입니다.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      techStack: [...(prev.techStack || []), techStack],
    }));
  };

  const handleTechStackRemove = (techStackToRemove: ITechStackType) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack?.filter(
        (item) => item.skill !== techStackToRemove.skill
      ),
    }));
  };

  const handleAddLink = () => {
    if (!newLink) return;
    if (!newLink.startsWith("http://") && !newLink.startsWith("https://")) {
      alert("올바른 URL 형식을 입력해주세요.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      links: [...(prev.links || []), newLink],
    }));
    setNewLink("");
  };

  const handleLinkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLink();
    }
  };

  const handleRemoveLink = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links?.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleJobGroupSelect = (selectedJobGroup: JobGroupType) => {
    console.log("Selected job group:", selectedJobGroup);
    // formData에는 _id를 저장
    handleInputChange("jobGroup", selectedJobGroup._id);
    // 화면 표시용 상태에는 job 이름을 저장
    setDisplayJobGroup(selectedJobGroup.job);
  };

  const handleJobGroupRemove = () => {
    handleInputChange("jobGroup", "");
    setDisplayJobGroup("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.contents) {
      alert("제목, 내용은 필수 입력 항목입니다.");
      return;
    }

    if (!formData.techStack?.length) {
      alert("기술 스택을 최소 1개 이상 선택해주세요.");
      return;
    }

    if (!formData.jobGroup) {
      alert("직군을 선택해주세요.");
      return;
    }

    try {
      console.log("포트폴리오 데이터:", formData);
      const response = await createPortfolio(formData as PortfolioType);
      if (response.data) {
        alert("포트폴리오가 성공적으로 등록되었습니다.");
        console.log(response.data);
        navigate(`/detail/${response.data._id}`);
      }
    } catch (error) {
      alert("포트폴리오 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <EditPortfolioPageWrapper>
      <form onSubmit={handleSubmit} className="mw-900">
        <input
          className="input"
          type="text"
          placeholder="제목을 입력하세요"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
        />

        <div className="input">
          <ThumbnailInput
            setPreviewThumbnail={(url) =>
              handleInputChange("thumbnailImage", url)
            }
            previewThumbnail={formData.thumbnailImage || ""}
          />
        </div>

        {formData.thumbnailImage && (
          <div className="preview-container">
            <img
              className="preview"
              src={formData.thumbnailImage}
              alt="썸네일 미리보기"
            />
          </div>
        )}

        <div className="links-section">
          <div className="input">
            <img src="/link-icon.svg" alt="link" />
            <input
              type="url"
              placeholder="https://example.com"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={handleLinkKeyDown}
            />
            <button type="button" onClick={handleAddLink}>
              추가
            </button>

            {formData.links && formData.links.length > 0 && (
              <div className="links-list">
                {formData.links.map((link, index) => (
                  <div key={index} className="link-item">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="remove-link-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="input big">
          <DropdownWithBtn
            name="기술스텍"
            items={techStackList}
            placeholder="기술스텍을 입력해주세요."
            onChange={handleTechStackSelect}
          />
          <div className="tech-stack-list">
            {formData.techStack?.map((techStack) => (
              <TechStack
                key={techStack.skill}
                content={techStack}
                onClick={() => handleTechStackRemove(techStack)}
              />
            ))}
          </div>
        </div>

        <div className="input big">
          <DropdownWithBtn
            name="직군"
            items={jobGroupList}
            placeholder="직군을 입력해주세요."
            onChange={handleJobGroupSelect}
          />
          {displayJobGroup && (
            <Tag content={displayJobGroup} onClick={handleJobGroupRemove} />
          )}
        </div>

        <div className="editor">
          <MyCKEditor
            onChange={(content: string) =>
              handleInputChange("contents", content)
            }
          />
        </div>

        <div className="input">
          <div className="tags-list">
            {formData.tags?.map((tag, index) => (
              <Tag
                key={index}
                content={tag}
                onClick={() => {
                  const updatedTags = formData.tags?.filter(
                    (_, i) => i !== index
                  );
                  handleInputChange("tags", updatedTags);
                }}
              />
            ))}
          </div>
          <TagInput
            tags={formData.tags || []}
            setTags={(tags) => handleInputChange("tags", tags)}
          />
        </div>

        <div className="submitBtn">
          <Button text="등록" colorType={3} />
        </div>
      </form>
    </EditPortfolioPageWrapper>
  );
};

export default EditPortfolioPage;
