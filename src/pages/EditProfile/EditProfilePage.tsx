import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import Tag from "../../components/Tag/Tag";
import TechStack from "../../components/TechStack/TechStack";
import { ITechStackType } from "../../types/api-types/TechStackType";
import { UserProfileType } from "../../types/api-types/UserType";
import { JobGroupType } from "../../types/api-types/JobGroup";
import { uploadSingleImg } from "../../api/upload-single-img";
import { createProfile } from "../../api/create-profile";
import { getJobGroup } from "../../api/get-job-group";
import { getTechStacks } from "../../api/get-tech-stacks";
import { getUserProfile } from "../../api/get-user-profile";

/**
 * todo
 * - 로그인 페이지에 진입하면 로컬스토리지에 저장되어 있는 토큰을 서버에 보냄
 * - 유저 정보를 받아와서 미리 화면에 매핑
 * - 유저 타입에 타입을 하나 새로 만들어서 타입 좁히기로 타입 분류 후 매핑
 * - useParams는 사용할 필요 없음
 * - 서버로 보낼 때 로컬 스토리지의 토큰을 같이 보내기
 */

const EditProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewProfileImg, setPreviewProfileImg] = useState<string | null>(null);
  const [name, setName] = useState("");
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
  const [jobGroups, setJobGroups] = useState<JobGroupType[] | null>(null);
  const [techStacks, setTechStacks] = useState<ITechStackType[] | null>(null);

  const techStackBtnRef = useRef<HTMLButtonElement>(null);
  const jobBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { userId } = useParams<{ userId: string }>();

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

  useEffect(() => {
    fetchJobGroup();
    fetchTechStack();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await getUserProfile(userId!);
      console.log(userData);
      if (!userData) {
        console.log("유저 정보 없음");
      } else if (typeof userData === "string") {
        console.log(userData);
      } else {
        setPreviewProfileImg(userData.profileImage);
        setName(userData.name);
        setUserInfo({
          ...userInfo,
          email: userData.email,
          mobile: userData.phoneNumber,
        });
        setSelectedTechStacks(userData.techStack);
        setSelectedJob(jobGroups?.find(jobGroup => jobGroup.job === userData.jobGroup)!);
        setIntro(userData.intro);
      }
    };

    if (userId && jobGroups) {
      fetchUserProfile();
    }
  }, [userId, jobGroups]);

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
      if (prev.some(stack => stack.skill === techStack.skill)) {
        return prev.filter(stack => stack.skill !== techStack.skill);
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

  const fetchJobGroup = async () => {
    const jobGroupData = await getJobGroup();
    if (jobGroupData && Array.isArray(jobGroupData)) {
      setJobGroups(jobGroupData.slice(1, jobGroupData.length));
    }
  };

  const fetchTechStack = async () => {
    const techStackData = await getTechStacks();
    if (techStackData && Array.isArray(techStackData)) {
      setTechStacks(techStackData);
    }
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
              <UserInfoInputs name={name} userInfo={userInfo} onChange={setUserInfo} />
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
            items={techStacks!}
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
            items={jobGroups!}
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
