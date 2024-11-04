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
import { techStacks, jobGroups } from "../../data/dummyData";
import Tag from "../../components/Tag/Tag";
import TechStack from "../../components/TechStack/TechStack";
import { ITechStackType } from "../../types/api-types/TechStackType";
import { UserProfileType } from "../../types/api-types/UserType";
import { JobGroupType } from "../../types/api-types/JobGroup";
import { uploadSingleImg } from "../../api/upload-single-img";
import { createProfile } from "../../api/create-profile";

/**
 * todo
 * - 로그인 페이지에서 로그인이 되면 유저 상태가 전역 상태로 저장
 * - useEffect 훅을 통해 유저정보가 있다면 미리 채워넣음
 */

const EditProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewProfileImg, setPreviewProfileImg] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    email: "",
    mobile: "",
    github: "",
    instagram: "",
    blog: "",
  });
  const [intro, setIntro] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobGroupType | null>(null);
  const [selectedTechStacks, setSelectedTechStacks] = useState<ITechStackType[]>([]);
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [techStackPosition, setTechStackPosition] = useState({ x: 0, y: 0 });
  const [jobPosition, setJobPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const techStackBtnRef = useRef<HTMLButtonElement>(null);
  const jobBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetDefaultProfile = () => {
    setProfileImage(null);
    setPreviewProfileImg(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const handleJobSelect = (job: JobGroupType) => {
    setSelectedJob(job);
    setIsJobOpen(false);
  };

  const handleTechStackSelect = (techStack: ITechStackType) => {
    setSelectedTechStacks(prev => {
      if (prev.includes(techStack)) {
        return prev.filter(stack => stack !== techStack);
      } else {
        return [...prev, techStack];
      }
    });
  };

  const handleSubmit = async () => {
    if (!profileImage) {
      return;
    }

    const profileImgUrl = await uploadSingleImg(profileImage);
    const userProfileData: UserProfileType = {
      email: userInfo.email,
      intro: intro,
      phoneNumber: userInfo.mobile,
      links: [userInfo.github, userInfo.instagram, userInfo.blog],
      techStack: selectedTechStacks,
      jobGroup: selectedJob?.job!,
      profileImage: profileImgUrl!,
    };

    const response = await createProfile(userProfileData);
    console.log(response);
  };

  return (
    <CenteredContainer>
      <EditProfilePageContainer>
        <H2>DEVPOREST 회원정보를 작성해주세요</H2>
        <EditProfileWrapper>
          <LeftUserInfo>
            <ProfileImage
              imageUrl={previewProfileImg}
              onImageChange={handleImageChange}
              onSetDefaultProfile={handleSetDefaultProfile}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              ref={modalRef}
            />
            <UserInfoInputWrapper>
              <UserInfoInputs onChange={setUserInfo} />
            </UserInfoInputWrapper>
          </LeftUserInfo>
          <RightUserInfo>
            <SelectContainer>
              <SelectWrapper>
                <SelectBtn ref={jobBtnRef} onClick={handleJobClick}>
                  직무
                </SelectBtn>
                <div>
                  {selectedJob && (
                    <Tag content={selectedJob.job} onClick={() => setSelectedJob(null)} />
                  )}
                </div>
              </SelectWrapper>
              <SelectWrapper>
                <SelectBtn ref={techStackBtnRef} onClick={handleTechStackClick}>
                  기술스택
                </SelectBtn>
                <div>
                  {selectedTechStacks.map(stack => (
                    <TechStack
                      key={stack.skill}
                      content={stack}
                      onClick={() => handleTechStackSelect(stack)}
                    />
                  ))}
                </div>
              </SelectWrapper>
            </SelectContainer>
            <Intro
              placeholder="자기소개를 입력해주세요"
              value={intro}
              onChange={e => setIntro(e.target.value)}
            />
          </RightUserInfo>
        </EditProfileWrapper>
        <SubmitBtn onClick={handleSubmit}>
          <Button text="등록" colorType={3} />
        </SubmitBtn>
        {isTechStackOpen && (
          <Dropdown
            isOpen={isTechStackOpen}
            items={techStacks}
            position={{ x: techStackPosition.x - 250, y: techStackPosition.y - 40 }}
            placeholder="기술스택을 입력하세요"
            onSelect={item => {
              if ("skill" in item) handleTechStackSelect(item);
            }}
          />
        )}
        {isJobOpen && (
          <Dropdown
            isOpen={isJobOpen}
            items={jobGroups}
            position={{ x: jobPosition.x - 250, y: jobPosition.y - 40 }}
            placeholder="직군을 입력하세요"
            onSelect={item => {
              if ("job" in item) handleJobSelect(item);
            }}
          />
        )}
      </EditProfilePageContainer>
    </CenteredContainer>
  );
};

export default EditProfilePage;
