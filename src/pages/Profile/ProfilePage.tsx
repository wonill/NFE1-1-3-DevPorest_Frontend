import ky from 'ky';
import { UserProfileResType, UserApiResType } from '../../types/api-types/UserType.ts';
import { PortfolioApiResType, DetailPortfolioType } from '../../types/api-types/PortfolioType.ts';
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DummyData } from "../../data/profilePageData.ts";
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
import emailImg from "../../assets/email.svg";
import heartImg from "../../assets/active_heart.svg";
import pencilImg from "../../assets/pencil.svg";
import TabComponent from "./TabComponent";
import EmptyPortfolio from "../../components/EmptyPortfolio/EmptyPortfolio.tsx";
import { getUserProfile } from '../../api/get-user-profile.ts';
import { getUserPortfolio, getLikePortfolio } from '../../api/get-user-portfolio.ts';

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
  const {userId} = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<UserProfileResType | undefined>(undefined);

  const [activeTab, setActiveTab] = useState("나의 포레스트");
  const [userPortfolioData, setUserPortfolioData] = useState<DetailPortfolioType[] | undefined>(undefined);
  const [likePortfolioData, setLikePortfolioData] = useState<DetailPortfolioType[] | undefined>(undefined);
  const [pagination, setpagination] = useState<pagination | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState(6);
  const [visibleData, setVisibleData] = useState<DetailPortfolioType[] | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile(userId!);
    console.log('유저 프로필', userProfile);
    if (typeof userProfile != 'string')setProfileData(userProfile)
  };

  const fetchUserPortfolio = async () => {
    const userPortfolio = await getUserPortfolio(userId!);
    console.log('유저 포트폴리오', userPortfolio);
    if ('data' in userPortfolio) setUserPortfolioData(userPortfolio.data);
    if ('pagination' in userPortfolio) setpagination(userPortfolio?.pagination);
  }

  const fetchUserLikePortfolio = async () => {
    const likePortfolio = await getLikePortfolio(userId!);
    console.log('유저가 좋아요 누른 포트폴리오', likePortfolio);
    if ('data' in likePortfolio) setLikePortfolioData(likePortfolio.data);
    if ('pagination' in likePortfolio) setpagination(likePortfolio?.pagination);
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  useEffect(() => {
    setVisibleCount(6);
    console.log(activeTab);
    if (activeTab === '나의 포레스트') {
      fetchUserPortfolio();
    } else {
      fetchUserLikePortfolio();
    }
  }, [activeTab]);

  const loadMoreData = useCallback(() => {
    const currentData = activeTab === '나의 포레스트' ? userPortfolioData : likePortfolioData;
    if (!currentData) return;

    const nextCount = visibleCount + 6;
    if (nextCount >= currentData.length) {
      setHasMore(false);
    }

    setVisibleCount(nextCount);
  }, [visibleData]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMoreData();
        }
      });
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleData]);

  

  const handleCardClick = (portfolio_id: string) => {
    console.log(`${portfolio_id}에 해당하는 페이지로 이동`);
    navigate(`detail?portfolio_id=${portfolio_id}`);
  };

  const onClickEditProfile = () => {
    // 수정 버튼 클릭 시 프로필 수정 페이지로 이동
    navigate("/edit_profile");
  };

  if (!profileData) return <div>Loading...</div>;

  const getCurrentData = () => {
    return activeTab === "나의 포레스트" ? userPortfolioData : likePortfolioData;
  };

  const renderPortfolioCards = (data: DetailPortfolioType[]) => {
    return data.slice(0, visibleCount).map((item, index) => (
      <PortfolioCard 
        key={index} 
        portfolio_id={item._id}
        title={item.title}
        thumbnailImg={item.thumbnailImage}
        profileImg={profileData.profileImage}
        userName={item.userInfo.name}
        views={item.view}
        likes={item.likeCount}
        onClick={() => handleCardClick(item._id)} 
      />
    ));
  };

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
                  <p>{profileData.phoneNumber || '등록된 전화번호가 없습니다.'} </p>
                </TelWrapper>
                <EmailWrpper>
                  <span>
                    <img src={emailImg} alt="이메일" />
                  </span>
                  <p>{profileData.email || '등록된 이메일이 없습니다.'}</p>
                </EmailWrpper>
              </Contact>
              <Intro>
                {profileData.intro || '등록된 소개가 없습니다.'}
              </Intro>
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
                <ProfileImage
                  src={profileData.profileImage}
                  alt="프로필 사진"
                />
              </ProfileImageInnerWrapper>
              <EditProfile onClick={onClickEditProfile}>
                <img src={pencilImg} alt="프로필 수정" />
              </EditProfile>
            </ProfileImageWrapper>
            <ExternalLinkWrapper>
              {profileData.links.map((link, i) => <ExternalLink key={i} imgType={i} link={link}/>)}
            </ExternalLinkWrapper>
          </UserInfoRight>
        </UserInfo>
        <TabComponent tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <UserPortfolioList>
          {(() => {
            const currentData = getCurrentData();
            if (currentData === undefined) {
              return <div>Loading...</div>;
            }
            if (currentData.length === 0) {
              return <EmptyPortfolio text={activeTab === '나의 포레스트' ? '등록된 작업물이 없습니다.' : '좋아요를 누른 게시물이 없습니다.'} />;
            }
            return renderPortfolioCards(currentData);
          })()}
        </UserPortfolioList>
        {hasMore && <Indicator ref={loadMoreRef} />}
      </ProfileContainer>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
