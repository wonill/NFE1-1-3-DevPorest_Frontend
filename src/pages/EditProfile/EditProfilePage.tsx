import React, { useState, useRef, useEffect } from "react";
import {
  CenteredContainer,
  EditProfilePageContainer,
  H2,
  EditProfileWrapper,
  LeftUserInfo,
  UserInfoInputWrapper,
  RightUserInfo,
  SelectContainer,
  SelectWrapper,
  SelectBtn,
  Intro,
  SubmitBtn,
} from "./EditProfilePage.styles";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import ProfileImage from "./ProfileImage";
import UserInfoInputs from "./UserInfoInputs";
import { techStacks, jobs, dummyTags, dummyTechStacks } from "../../data/dummyData";
import Tag from "../../components/Tag/Tag";
import TechStack from "../../components/TechStack/TechStack";

const EditProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [techStackPosition, setTechStackPosition] = useState({ x: 0, y: 0 });
  const [jobPosition, setJobPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const techStackBtnRef = useRef<HTMLButtonElement>(null);
  const jobBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleTechStackClick = () => {
    if (techStackBtnRef.current) {
      const rect = techStackBtnRef.current.getBoundingClientRect();
      setTechStackPosition({ x: rect.left, y: rect.bottom });
    }
    setIsTechStackOpen(prev => !prev);
  };

  const handleJobClick = () => {
    if (jobBtnRef.current) {
      const rect = jobBtnRef.current.getBoundingClientRect();
      setJobPosition({ x: rect.left, y: rect.bottom });
    }
    setIsJobOpen(prev => !prev);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetDefaultProfile = () => {
    setProfileImage(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <CenteredContainer>
      <EditProfilePageContainer>
        <H2>DEVPOREST 회원정보를 작성해주세요</H2>
        <EditProfileWrapper>
          <LeftUserInfo>
            <ProfileImage
              imageUrl={profileImage}
              onImageChange={handleImageChange}
              onSetDefaultProfile={handleSetDefaultProfile}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              ref={modalRef}
            />
            <UserInfoInputWrapper>
              <UserInfoInputs />
            </UserInfoInputWrapper>
          </LeftUserInfo>
          <RightUserInfo>
            <SelectContainer>
              <SelectWrapper>
                <p>직무 선택</p>
                <div>
                  <SelectBtn ref={jobBtnRef} onClick={handleJobClick}></SelectBtn>
                  {dummyTags.map(tag => (
                    <Tag key={tag.content} {...tag} />
                  ))}
                </div>
              </SelectWrapper>
              <SelectWrapper>
                <p>기술스택 선택</p>
                <div>
                  <SelectBtn ref={techStackBtnRef} onClick={handleTechStackClick}></SelectBtn>
                  {dummyTechStacks.map(techStack => (
                    <TechStack
                      key={techStack.skill}
                      content={{ ...techStack }}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </SelectWrapper>
            </SelectContainer>
            <Intro placeholder="자기소개를 입력해주세요"></Intro>
          </RightUserInfo>
        </EditProfileWrapper>
        <SubmitBtn>
          <Button text="등록" colorType={3} />
        </SubmitBtn>
        {isTechStackOpen && (
          <Dropdown
            isOpen={isTechStackOpen}
            items={techStacks}
            position={{ x: techStackPosition.x, y: techStackPosition.y + 10 }}
            placeholder="기술스택을 입력하세요"
            onSelect={item => console.log(item)}
          />
        )}
        {isJobOpen && (
          <Dropdown
            isOpen={isJobOpen}
            items={jobs}
            position={{ x: jobPosition.x, y: jobPosition.y + 10 }}
            placeholder="직군을 입력하세요"
            onSelect={item => console.log(item)}
          />
        )}
      </EditProfilePageContainer>
    </CenteredContainer>
  );
};

export default EditProfilePage;
