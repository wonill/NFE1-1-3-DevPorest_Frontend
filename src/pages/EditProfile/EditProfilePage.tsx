import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//assets
import NoImage from "../../assets/no_image.svg";

//styles
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

//component
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import ProfileImage from "./ProfileImage";
import UserInfoInputs from "./UserInfoInputs";
import Tag from "../../components/Tag/Tag";
import TechStack from "../../components/TechStack/TechStack";
import { ITechStackType } from "../../types/api-types/TechStackType";

//types
import { GithubUserProfileResType, UserProfileResType } from "../../types/api-types/UserType";
import { JobGroupType } from "../../types/api-types/JobGroup";

//api
import { uploadSingleImg } from "../../api/upload-single-img";
import { createProfile, modifyProfile } from "../../api/create-profile";
import { getJobGroup } from "../../api/get-job-group";
import { getTechStacks } from "../../api/get-tech-stacks";
import { getMyProfile } from "../../api/get-user-profile";

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
  const [githubInfo, setGithubInfo] = useState<GithubUserProfileResType>({
    userID: "",
    name: "",
    profileImage: "",
    newUser: false,
  });
  const [userInfo, setUserInfo] = useState<UserProfileResType>({
    email: "",
    phoneNumber: "",
    links: [],
    intro: "",
    name: "",
    userID: "",
    techStack: [],
    jobGroup: "",
    profileImage: "",
  });

  // Dropdown 상태들 .. 나중에 정리
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

  const navigate = useNavigate();

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
      const userData = await getMyProfile();
      if (!userData) {
        console.log("유저 정보 없음");
        return;
      }
      setGithubInfo(userData as GithubUserProfileResType);
      if (userData.newUser) {
        setPreviewProfileImg("");
        setUserInfo(prev => {
          return {
            ...prev,
            userID: githubInfo.userID,
            name: githubInfo.name,
            profileImage: "",
          };
        });
        return;
      }
      setUserInfo(prev => {
        return {
          ...prev,
          ...userData,
        };
      });
      setPreviewProfileImg(userData.profileImage);
    };

    fetchUserProfile();
  }, []);

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
    console.log(file);
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    //file 사용이 끝나면 초기화
    event.target.value = "";
  };

  const handleSetDefaultProfile = () => {
    setProfileImage(null);
    setPreviewProfileImg(NoImage);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const handleJobSelect = (jobGroup: JobGroupType) => {
    setUserInfo(prev => {
      return { ...prev, jobGroup: jobGroup.job };
    });
    setIsJobOpen(false);
  };

  const addTeckStack = (techStack: ITechStackType) => {
    if (userInfo.techStack.find(stack => stack.skill === techStack.skill)) {
      return;
    }

    setUserInfo(prev => {
      return { ...prev, techStack: [...prev.techStack, techStack] };
    });
  };

  const removeTeckStack = (skill: string) => {
    setUserInfo(prev => {
      return { ...prev, techStack: prev.techStack.filter(stack => stack.skill !== skill) };
    });
  };
  const handleSubmit = async () => {
    let profileImgUrl: string = "";
    let jobCode: string = jobGroups?.find(job => job.job === userInfo.jobGroup)?._id ?? "";

    if (!jobCode) {
      alert("직무 명이 올바르지 않습니다.");
      return;
    }

    if (profileImage) {
      profileImgUrl = (await uploadSingleImg(profileImage)) ?? "";

      setUserInfo(prev => {
        return { ...prev, profileImage: profileImgUrl };
      });
    }

    const { userID, name, ...userProfileData } = {
      ...userInfo,
      techStack: userInfo.techStack.map(stack => stack.skill),
      jobGroup: jobCode,
      profileImage: profileImgUrl,
    };

    console.log(userProfileData);
    if (githubInfo.newUser) {
      await createProfile(userProfileData);
      alert("프로필 등록이 완료되었습니다.");
      navigate("/");
      return;
    }

    await modifyProfile(userProfileData);
    alert("프로필 수정이 완료되었습니다.");
    navigate("/");
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
              <UserInfoInputs name={userInfo.name} userInfo={userInfo} setUserInfo={setUserInfo} />
            </UserInfoInputWrapper>
          </LeftUserInfo>
          <RightUserInfo>
            <SelectContainer>
              <SelectWrapper>
                <SelectBtn ref={jobBtnRef} onClick={handleJobClick}>
                  직무
                </SelectBtn>
                <div>
                  {userInfo.jobGroup && (
                    <Tag
                      content={userInfo.jobGroup}
                      onClick={() =>
                        setUserInfo(prev => {
                          return { ...prev, jobGroup: "" };
                        })
                      }
                    />
                  )}
                </div>
              </SelectWrapper>
              <SelectWrapper>
                <SelectBtn ref={techStackBtnRef} onClick={handleTechStackClick}>
                  기술스택
                </SelectBtn>
                <div>
                  {userInfo.techStack.map(stack => (
                    <TechStack
                      key={stack.skill}
                      content={stack}
                      onClick={() => {
                        removeTeckStack(stack.skill);
                      }}
                    />
                  ))}
                </div>
              </SelectWrapper>
            </SelectContainer>
            <Intro
              placeholder="자기소개를 입력해주세요"
              value={userInfo.intro}
              onChange={e =>
                setUserInfo(prev => {
                  return { ...prev, intro: e.target.value };
                })
              }
            />
          </RightUserInfo>
        </EditProfileWrapper>
        <SubmitBtn>
          <Button text="등록" colorType={3} onClick={handleSubmit} />
        </SubmitBtn>
        {isTechStackOpen && (
          <Dropdown
            isOpen={isTechStackOpen}
            items={techStacks!}
            position={{ x: techStackPosition.x - 250, y: techStackPosition.y - 40 }}
            placeholder="기술스택을 입력하세요"
            onSelect={item => {
              if ("skill" in item) addTeckStack(item);
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
