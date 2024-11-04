import ky from 'ky';
import { UserProfileResType, UserApiResType } from '../../types/api-types/UserType.ts';
import { PortfolioApiResType, DetailPortfolioType } from '../../types/api-types/PortfolioType.ts';
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

const userId = 'csk6314';
interface UserInfo {
  userID: string;
  name: string;
  profileImage: string;
}
interface PortfolioType extends DetailPortfolioType {
  userInfo : UserInfo;
}


const tabs = ["나의 포레스트", "좋아요"];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UserProfileResType | undefined>(undefined);

  const [activeTab, setActiveTab] = useState("나의 포레스트");
  const [userPortfolioData, setUserPortfolioData] = useState<DetailPortfolioType[] | undefined>(undefined);
  const [likePortfolioData, setLikePortfolioData] = useState<DetailPortfolioType[] | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState(6);
  const [visibleData, setVisibleData] = useState<DetailPortfolioType[] | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  

  const fetchUserProfile = async () => {
    try {
      // const response2 = await ky.get('http://140.245.78.132:8080/api/users/popular').json<UserApiResType<UserProfileResType>>();
      // console.log(response2);
      const response = await ky.get(`http://140.245.78.132:8080/api/users/user/${userId}`).json<UserApiResType<UserProfileResType>>();
      // console.log('유저 1명',response);
      setProfileData(response.data);
    } catch (e) {
      setError('유저 정보 불러오는 중 오류 발생');
      console.log(e);
    }
  };

  const fetchUserPortfolio = async () => {
    try {
      const response = await ky.get(`http://140.245.78.132:8080/api/portfolios/user/${userId}`).json<PortfolioApiResType>();
      console.log('유저의 포트폴리오 목록', response);
      setUserPortfolioData(response.data);
      setVisibleData(response.data);
    } catch (e) {
      setError('유저의 포트폴리오 목록을 불러오는 중 오류 발생');
      console.log(e);
    }
  }

  const fetchUserLikePortfolio = async () => {
    try {
      const response = await ky.get(`http://140.245.78.132:8080/api/portfolios/like/${userId}`).json<PortfolioApiResType>();
      console.log('유저가 좋아요 누른 포트폴리오 목록', response);
      setLikePortfolioData(response.data);
      setVisibleData(response.data);
    } catch (e) {
      setError('유저가 좋아요를 누른 포트폴리오 목록을 불러오는 중 오류 발생');
      console.log(e);
    }
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
    navigate('detail?portfolio_id=672444a647da2aed5646b135');
  };

  const onClickEditProfile = () => {
    // 수정 버튼 클릭 시 프로필 수정 페이지로 이동
    navigate("/edit_profile");
  };


  if (error) return <div>{error}</div>
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
        userName={item.userID}
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
              return <div>로딩중...</div>;
            }
            if (currentData.length === 0) {
              return <EmptyPortfolio text={'등록된 작업물이 없습니다.'} />;
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
