import React, { useState, useRef } from "react";
import {
  CenteredContainer,
  EditProfilePageContainer,
  H2,
  EditProfileWrapper,
  LeftUserInfo,
  ProfileImageWrapper,
  PencilImage,
  UserInfoInputWrapper,
  RightUserInfo,
  SelectContainer,
  SelectWrapper,
  SelectBtn,
  Intro,
  SubmitBtn,
} from "./EditProfilePage.styles";
import email from "../../assets/email.svg";
import mobile from "../../assets/mobile.svg";
import blog from "../../assets/blog.svg";
import gitHub from "../../assets/github.svg";
import instagram from "../../assets/instagram.svg";
import pencil from "../../assets/pencil.svg";
import Button from "../../components/Button/Button";
import TechStack from "../../components/TechStack/TechStack";
import Tag from "../../components/Tag/Tag";
import Dropdown from "../../components/Dropdown/Dropdown";
import InfoInput from "./InfoInput";
import { dummyTags, dummyTechStacks, techStacks, jobs } from "../../data/dummyData";

const EditProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [techStackPosition, setTechStackPosition] = useState({ x: 0, y: 0 });
  const [jobPosition, setJobPosition] = useState({ x: 0, y: 0 });

  const techStackBtnRef = useRef<HTMLButtonElement>(null);
  const jobBtnRef = useRef<HTMLButtonElement>(null);

  const handleTechStackClick = () => {
    if (techStackBtnRef.current) {
      const rect = techStackBtnRef.current.getBoundingClientRect();
      setTechStackPosition({ x: rect.left, y: rect.bottom });
    }
    setIsTechStackOpen(!isTechStackOpen);
  };

  const handleJobClick = () => {
    if (jobBtnRef.current) {
      const rect = jobBtnRef.current.getBoundingClientRect();
      setJobPosition({ x: rect.left, y: rect.bottom });
    }
    setIsJobOpen(!isJobOpen);
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

  return (
    <CenteredContainer>
      <EditProfilePageContainer>
        <H2>DEVPOREST 회원정보를 작성해주세요</H2>
        <EditProfileWrapper>
          <LeftUserInfo>
            <ProfileImageWrapper>
              <img
                src={
                  profileImage ||
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300"
                }
                alt="Profile"
              />
              <PencilImage onClick={() => document.getElementById("fileInput")?.click()}>
                <img src={pencil} alt="Edit" />
              </PencilImage>
              <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} />
            </ProfileImageWrapper>
            <UserInfoInputWrapper>
              <p>홍길동</p>
              <InfoInput icon={email} placeholder="이메일을 입력해주세요." />
              <InfoInput icon={mobile} placeholder="휴대폰 번호를 입력해주세요." />
              <InfoInput icon={gitHub} placeholder="GitHub 링크를 입력해주세요." />
              <InfoInput icon={instagram} placeholder="Instagram 링크를 입력해주세요." />
              <InfoInput icon={blog} placeholder="Blog 링크를 입력해주세요." />
            </UserInfoInputWrapper>
          </LeftUserInfo>
          <RightUserInfo>
            <SelectContainer>
              <SelectWrapper>
                <p>직무 선택</p>
                <div>
                  <SelectBtn ref={techStackBtnRef} onClick={handleTechStackClick}></SelectBtn>
                  {dummyTags.map(tag => (
                    <Tag key={tag.content} {...tag} />
                  ))}
                </div>
              </SelectWrapper>
              <SelectWrapper>
                <p>기술스택 선택</p>
                <div>
                  <SelectBtn ref={jobBtnRef} onClick={handleJobClick}></SelectBtn>
                  {dummyTechStacks.map(techStack => (
                    <TechStack key={techStack.name} {...techStack} />
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
            onSelect={item => console.log(item.name)}
          />
        )}
        {isJobOpen && (
          <Dropdown
            isOpen={isJobOpen}
            items={jobs}
            position={{ x: jobPosition.x, y: jobPosition.y + 10 }}
            placeholder="직군을 입력하세요"
            onSelect={item => console.log(item.name)}
          />
        )}
      </EditProfilePageContainer>
    </CenteredContainer>
  );
};

export default EditProfilePage;
