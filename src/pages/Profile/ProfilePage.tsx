import { UserProfileResType } from "../../types/api-types/UserType.ts";
import { DetailPortfolioType } from "../../types/api-types/PortfolioType.ts";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard.tsx";
import TechStack from "../../components/TechStack/TechStack.tsx";
import ExternalLink from "../../components/ExternalLink/ExternalLink.tsx";
import {
  ProfilePageWrapper,
  ProfileContainer,
  UserInfoLeft,
  UserInfoRight,
  UserInfo,
  StyledSwiperSlide,
  TechStackList,
  TechStackWrapper,
  EditProfile,
  TotalLikes,
  ExternalLinkWrapper,
  Indicator,
  UserPortfolioList,
} from "./ProfilePage.style.tsx";
import {
  UserDetails,
  NameAndJob,
  UserName,
  Job,
  Contact,
  TelWrapper,
  EmailWrpper,
  Intro,
} from "./UserDetails.style.tsx";
import {
  ProfileImageWrapper,
  ProfileImageInnerWrapper,
  ProfileImage,
} from "./ProfileImage.style.tsx";
import phoneImg from "../../assets/profile_page_phone.svg";
import emailImg from "../../assets/profile_page_email.svg";
import heartImg from "../../assets/active_heart.svg";
import pencilImg from "../../assets/pencil.svg";
import TabComponent from "./TabComponent";
import EmptyPortfolio from "../../components/EmptyPortfolio/EmptyPortfolio.tsx";
import { getUserProfile } from "../../api/get-user-profile.ts";
import { getUserPortfolio, getLikePortfolio } from "../../api/get-user-portfolio.ts";

const tabs = ["나의 포레스트", "좋아요"];

interface pagination {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  totalCount: number;
  limit: number;
}

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<UserProfileResType | undefined>(undefined);

  const [activeTab, setActiveTab] = useState("나의 포레스트");
  const [userPortfolioData, setUserPortfolioData] = useState<DetailPortfolioType[] | undefined>(
    undefined,
  );
  const [likePortfolioData, setLikePortfolioData] = useState<DetailPortfolioType[] | undefined>(
    undefined,
  );
  const [pagination, setPagination] = useState<pagination | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioList, setPortfolioList] = useState<DetailPortfolioType[] | undefined>(undefined);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile(userId!);
    console.log("유저 프로필", userProfile);
    if (typeof userProfile != "string") setProfileData(userProfile);
  };

  const fetchUserPortfolio = async () => {
    const userPortfolio = await getUserPortfolio(userId!);
    console.log("유저 포트폴리오", userPortfolio);
    if ("data" in userPortfolio)
      setUserPortfolioData(prev => (prev ? [...prev, ...userPortfolio.data] : userPortfolio.data));
    if ("pagination" in userPortfolio) setPagination(userPortfolio?.pagination);
  };

  const fetchUserLikePortfolio = async () => {
    const likePortfolio = await getLikePortfolio(userId!);
    console.log("유저가 좋아하는포트폴리오", likePortfolio);
    if ("data" in likePortfolio)
      setLikePortfolioData(prev => (prev ? [...prev, ...likePortfolio.data] : likePortfolio.data));
    if ("pagination" in likePortfolio) setPagination(likePortfolio.pagination);
  };

  useEffect(() => {
    setPortfolioList(userPortfolioData);
  }, [userPortfolioData]);

  useEffect(() => {
    setPortfolioList(likePortfolioData);
  }, [likePortfolioData]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log(activeTab);
    setUserPortfolioData([]);
    setLikePortfolioData([]);
    setPagination(undefined);
    if (activeTab === "나의 포레스트") {
      fetchUserPortfolio();
    } else {
      fetchUserLikePortfolio();
    }
  }, [activeTab]);

  const loadMoreData = useCallback(async () => {
    if (isLoading || !pagination?.hasNextPage) return;
    try {
      setIsLoading(true);
      if (activeTab === "나의 포레스트") {
        await fetchUserPortfolio();
      } else {
        await fetchUserLikePortfolio();
      }
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, pagination?.hasNextPage, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && pagination?.hasNextPage) {
          loadMoreData();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreData]);

  const handleCardClick = (portfolio_id: string) => {
    navigate(`/detail/${portfolio_id}`);
  };

  const onClickEditProfile = () => {
    // 수정 버튼 클릭 시 프로필 수정 페이지로 이동
    navigate("/edit_profile");
  };

  if (!profileData) return <div>Loading...</div>;

  // const renderPortfolioCards = (data: DetailPortfolioType[]) => {
  //   return
  // };

  return (
    <ProfilePageWrapper>
      <ProfileContainer>
        <UserInfo>
          <UserInfoLeft>
            <UserDetails>
              <NameAndJob>
                <UserName>{profileData.name}</UserName>
                <Job>{profileData.jobGroup}</Job>
              </NameAndJob>
              <Contact>
                <TelWrapper>
                  <span>
                    <img src={phoneImg} alt="전화번호" />
                  </span>
                  <p>{profileData.phoneNumber || "등록된 전화번호가 없습니다."} </p>
                </TelWrapper>
                <EmailWrpper>
                  <span>
                    <img src={emailImg} alt="이메일" />
                  </span>
                  <p>{profileData.email || "등록된 이메일이 없습니다."}</p>
                </EmailWrpper>
              </Contact>
              <Intro>{profileData.intro || "등록된 소개가 없습니다."}</Intro>
            </UserDetails>
            <TechStackList>
              {profileData.techStack.length >= 4 ? (
                <Swiper slidesPerView="auto" spaceBetween={10}>
                  {profileData.techStack.map((item, i) => (
                    <StyledSwiperSlide key={i}>
                      <TechStackWrapper>
                        <TechStack content={{ ...item }} onClick={() => {}} />
                      </TechStackWrapper>
                    </StyledSwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div>
                  {profileData.techStack.map((item, i) => (
                    <TechStackWrapper key={i}>
                      <TechStack content={{ ...item }} onClick={() => {}} />
                    </TechStackWrapper>
                  ))}
                </div>
              )}
            </TechStackList>
          </UserInfoLeft>
          <UserInfoRight>
            <ProfileImageWrapper>
              <TotalLikes>
                <img src={heartImg} alt="TotalLikes" />
                <p>{profileData.totalLikes}</p>
              </TotalLikes>
              <ProfileImageInnerWrapper>
                <ProfileImage src={profileData.profileImage} alt="프로필 사진" />
              </ProfileImageInnerWrapper>
              <EditProfile onClick={onClickEditProfile}>
                <img src={pencilImg} alt="프로필 수정" />
              </EditProfile>
            </ProfileImageWrapper>
            <ExternalLinkWrapper>
              {profileData.links.map((link, i) => (
                <ExternalLink key={i} imgType={i} link={link} />
              ))}
            </ExternalLinkWrapper>
          </UserInfoRight>
        </UserInfo>
        <TabComponent tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <UserPortfolioList>
          {portfolioList &&
            portfolioList.map((item, index) => (
              <PortfolioCard
                key={index}
                portfolio_id={item._id}
                title={item.title}
                thumbnailImg={item.thumbnailImage}
                profileImg={item.userInfo.profileImage}
                userName={item.userInfo.name}
                views={item.view}
                likes={item.likeCount}
                onClick={() => handleCardClick(item._id)}
              />
            ))}
        </UserPortfolioList>
        {portfolioList?.length === 0 && (
          <EmptyPortfolio
            text={
              activeTab === "나의 포레스트"
                ? "등록된 작업물이 없습니다."
                : "좋아요를 누른 게시물이 없습니다."
            }
          />
        )}
        {pagination?.hasNextPage && <Indicator ref={loadMoreRef} />}
      </ProfileContainer>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
