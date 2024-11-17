import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor as CKEditorType } from "@ckeditor/ckeditor5-core";
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
import { handlePortfolio } from "../../api/create-portfolio";
import { getPortfolio } from "../../api/get-portfolio-detail";

const EditPortfolioPage = () => {
  const navigate = useNavigate();
  const { techStackList, jobGroupList } = useTechStacksAndJobGroups();
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [formData, setFormData] = useState<Omit<PortfolioType, "userInfo">>({
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
  const [editorInstance, setEditorInstance] = useState<CKEditorType | null>(null);

  // 포트폴리오 데이터 불러오기
  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!portfolioId) return;

      try {
        const response = await getPortfolio(portfolioId);
        const portfolioData = response.data;

        if (portfolioData) {
          setFormData({
            title: portfolioData.title,
            contents: portfolioData.contents,
            images: portfolioData.images,
            tags: portfolioData.tags,
            techStack: portfolioData.techStack,
            thumbnailImage: portfolioData.thumbnailImage,
            jobGroup: portfolioData.jobGroup,
            links: portfolioData.links || [],
          });

          // 에디터 내용 업데이트
          if (editorInstance) {
            editorInstance.setData(portfolioData.contents);
          }

          // jobGroup 표시 이름 설정
          const selectedJobGroup = jobGroupList.find(job => job.job === portfolioData?.jobGroup);
          if (selectedJobGroup) {
            setDisplayJobGroup(selectedJobGroup.job);
            handleInputChange("jobGroup", selectedJobGroup._id); // 수정 api 요청시에는 _id를 사용
          }
        }
      } catch (error) {
        alert("포트폴리오 데이터를 불러오는데 실패했습니다.");
        navigate("/");
      }
    };

    fetchPortfolioData();
  }, [portfolioId, jobGroupList, navigate]);

  const handleInputChange = (field: keyof PortfolioType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTechStackSelect = (techStack: ITechStackType) => {
    if (formData.techStack?.some(item => item.skill === techStack.skill)) {
      alert("이미 추가된 기술스택입니다.");
      return;
    }

    setFormData(prev => ({
      ...prev,
      techStack: [...(prev.techStack || []), techStack],
    }));
  };

  const handleTechStackRemove = (techStackToRemove: ITechStackType) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack?.filter(item => item.skill !== techStackToRemove.skill),
    }));
  };

  const handleAddLink = () => {
    if (!newLink) return;
    if (!newLink.startsWith("http://") && !newLink.startsWith("https://")) {
      alert("올바른 URL 형식을 입력해주세요.");
      return;
    }

    setFormData(prev => ({
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
    setFormData(prev => ({
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

    if (!formData.title || !formData.contents || !formData.thumbnailImage) {
      alert("제목, 내용, 대표사진은 필수 입력 항목입니다.");
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
      console.log("formData:", formData);
      // console.log("formData title ", formData.title);
      const response = await handlePortfolio(formData as PortfolioType, portfolioId);

      // 생성도 수정을 거치면서, 생성 수정 response가 동일해져서 분간 힘듦
      // 작성완료버튼 누르면 -> alert 대신 그냥 바로 디테일 페이지로 넘어가는걸로...

      navigate(`/detail/${response._id}`);
    } catch (error) {
      alert(
        portfolioId
          ? "포트폴리오 수정 중 오류가 발생했습니다."
          : "포트폴리오 등록 중 오류가 발생했습니다.",
      );
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
          onChange={e => handleInputChange("title", e.target.value)}
          required
        />

        <div className="input">
          <ThumbnailInput
            setPreviewThumbnail={url => handleInputChange("thumbnailImage", url)}
            previewThumbnail={formData.thumbnailImage || ""}
          />
        </div>

        {formData.thumbnailImage && (
          <div className="preview-container">
            <img className="preview" src={formData.thumbnailImage} alt="썸네일 미리보기" />
          </div>
        )}

        <div className="links-section">
          <div className="input">
            <img src="/link-icon.svg" alt="link" />
            <input
              type="url"
              placeholder="https://example.com (enter로 추가)"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onKeyDown={handleLinkKeyDown}
            />

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
            {formData.techStack?.map(techStack => (
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
          {displayJobGroup && <Tag content={displayJobGroup} onClick={handleJobGroupRemove} />}
        </div>

        <div className="editor">
          <MyCKEditor
            onChange={(content: string) => handleInputChange("contents", content)}
            onReady={editor => setEditorInstance(editor)}
            initialContent={formData.contents}
          />
        </div>

        <div className="input">
          <div className="tags-list">
            {formData.tags?.map((tag, index) => (
              <Tag
                key={index}
                content={tag}
                onClick={() => {
                  const updatedTags = formData.tags?.filter((_, i) => i !== index);
                  handleInputChange("tags", updatedTags);
                }}
              />
            ))}
          </div>
          <TagInput tags={formData.tags || []} setTags={tags => handleInputChange("tags", tags)} />
        </div>

        <div className="submitBtn">
          <Button text={portfolioId ? "수정" : "등록"} colorType={3} />
        </div>
      </form>
    </EditPortfolioPageWrapper>
  );
};

export default EditPortfolioPage;
