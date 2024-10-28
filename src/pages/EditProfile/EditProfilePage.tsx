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
import TechStack, { TechStackType } from "../../components/TechStack/TechStack";
import Tag from "../../components/Tag/Tag";
import { Job } from "../../types/job";
import Dropdown from "../../components/Dropdown/Dropdown";
import InfoInput from "./InfoInput";

const dummyTags = [
  {
    content: "Frontend Developer",
  },
];

const dummyTechStacks: Array<TechStackType> = [
  {
    name: "React",
    backgroundColor: "#61dafb",
    color: "#282c34",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007acc",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
];

const techStacks: TechStackType[] = [
  {
    name: "React",
    backgroundColor: "#61dafb",
    color: "#282c34",
    onClick: () => console.log("React clicked"),
  },
  {
    name: "Node.js",
    backgroundColor: "#8CC84B",
    color: "#ffffff",
    onClick: () => console.log("Node.js clicked"),
  },
  {
    name: "Angular",
    backgroundColor: "#dd0031",
    color: "#ffffff",
    onClick: () => console.log("Angular clicked"),
  },
  {
    name: "Vue.js",
    backgroundColor: "#42b883",
    color: "#ffffff",
    onClick: () => console.log("Vue.js clicked"),
  },
  {
    name: "Django",
    backgroundColor: "#092e20",
    color: "#ffffff",
    onClick: () => console.log("Django clicked"),
  },
  {
    name: "Flask",
    backgroundColor: "#000000",
    color: "#ffffff",
    onClick: () => console.log("Flask clicked"),
  },
  {
    name: "Spring",
    backgroundColor: "#6db33f",
    color: "#ffffff",
    onClick: () => console.log("Spring clicked"),
  },
  {
    name: "Ruby on Rails",
    backgroundColor: "#e45d27",
    color: "#ffffff",
    onClick: () => console.log("Ruby on Rails clicked"),
  },
  {
    name: "Laravel",
    backgroundColor: "#ff2d55",
    color: "#ffffff",
    onClick: () => console.log("Laravel clicked"),
  },
  {
    name: "ASP.NET",
    backgroundColor: "#512BD4",
    color: "#ffffff",
    onClick: () => console.log("ASP.NET clicked"),
  },
  {
    name: "Firebase",
    backgroundColor: "#ffca28",
    color: "#ffffff",
    onClick: () => console.log("Firebase clicked"),
  },
  {
    name: "Docker",
    backgroundColor: "#2496ed",
    color: "#ffffff",
    onClick: () => console.log("Docker clicked"),
  },
  {
    name: "Kubernetes",
    backgroundColor: "#326ce5",
    color: "#ffffff",
    onClick: () => console.log("Kubernetes clicked"),
  },
  {
    name: "AWS",
    backgroundColor: "#ff9900",
    color: "#ffffff",
    onClick: () => console.log("AWS clicked"),
  },
  {
    name: "Azure",
    backgroundColor: "#0078d4",
    color: "#ffffff",
    onClick: () => console.log("Azure clicked"),
  },
  {
    name: "Google Cloud",
    backgroundColor: "#4285f4",
    color: "#ffffff",
    onClick: () => console.log("Google Cloud clicked"),
  },
  {
    name: "PostgreSQL",
    backgroundColor: "#336791",
    color: "#ffffff",
    onClick: () => console.log("PostgreSQL clicked"),
  },
  {
    name: "MongoDB",
    backgroundColor: "#47A248",
    color: "#ffffff",
    onClick: () => console.log("MongoDB clicked"),
  },
  {
    name: "MySQL",
    backgroundColor: "#00758f",
    color: "#ffffff",
    onClick: () => console.log("MySQL clicked"),
  },
  {
    name: "Redis",
    backgroundColor: "#d50000",
    color: "#ffffff",
    onClick: () => console.log("Redis clicked"),
  },
  {
    name: "Apache Kafka",
    backgroundColor: "#231f20",
    color: "#ffffff",
    onClick: () => console.log("Apache Kafka clicked"),
  },
  {
    name: "GraphQL",
    backgroundColor: "#e10098",
    color: "#ffffff",
    onClick: () => console.log("GraphQL clicked"),
  },
  {
    name: "TypeScript",
    backgroundColor: "#007ACC",
    color: "#ffffff",
    onClick: () => console.log("TypeScript clicked"),
  },
  {
    name: "HTML",
    backgroundColor: "#e34f26",
    color: "#ffffff",
    onClick: () => console.log("HTML clicked"),
  },
  {
    name: "CSS",
    backgroundColor: "#1572B6",
    color: "#ffffff",
    onClick: () => console.log("CSS clicked"),
  },
  {
    name: "Sass",
    backgroundColor: "#cc6699",
    color: "#ffffff",
    onClick: () => console.log("Sass clicked"),
  },
  {
    name: "Bootstrap",
    backgroundColor: "#563d7c",
    color: "#ffffff",
    onClick: () => console.log("Bootstrap clicked"),
  },
  {
    name: "Tailwind CSS",
    backgroundColor: "#06b6d4",
    color: "#ffffff",
    onClick: () => console.log("Tailwind CSS clicked"),
  },
  {
    name: "jQuery",
    backgroundColor: "#0868ac",
    color: "#ffffff",
    onClick: () => console.log("jQuery clicked"),
  },
];

const jobs: Job[] = [
  { jobCode: 1, name: "Software Engineer" },
  { jobCode: 2, name: "Data Scientist" },
  { jobCode: 3, name: "Product Manager" },
  { jobCode: 4, name: "UX/UI Designer" },
  { jobCode: 5, name: "QA Engineer" },
  { jobCode: 6, name: "DevOps Engineer" },
  { jobCode: 7, name: "System Administrator" },
  { jobCode: 8, name: "Database Administrator" },
  { jobCode: 9, name: "Network Engineer" },
  { jobCode: 10, name: "Business Analyst" },
  { jobCode: 11, name: "Sales Representative" },
  { jobCode: 12, name: "Content Writer" },
  { jobCode: 13, name: "Marketing Specialist" },
  { jobCode: 14, name: "SEO Specialist" },
  { jobCode: 15, name: "Technical Support Specialist" },
];

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
