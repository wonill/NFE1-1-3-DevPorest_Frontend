import ky from 'ky';
import { UserProfileResType } from '../../types/api-types/UserType.ts';
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DummyData } from "../../data/profilePageData.ts";
import { techStacks } from "../../data/dummyData.ts";
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
  UserPortfolioList,
  Indicator,
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

interface ApiResponse {
  success : boolean;
  data: UserProfileResType;
}


const tabs = ["나의 포레스트", "좋아요"];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UserProfileResType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("나의 포레스트");
  const [visibleData, setVisibleData] = useState(DummyData.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchUserProfile = async () => {
    try {
      // const response2 = await ky.get('http://140.245.78.132:8080/api/users/popular').json<UserProfile>();
      // console.log(response2);
      const response = await ky.get('http://140.245.78.132:8080/api/users/user/user555').json<ApiResponse>();
      console.log('유저 1명',response.data);
      setProfileData(response.data);
    } catch (e) {
      setError('유저 정보 불러오는 중 오류 발생');
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const loadMoreData = useCallback(() => {
    const nextData = DummyData.slice(visibleData.length, visibleData.length + 3);
    if (nextData.length > 0) {
      setVisibleData(prev => [...prev, ...nextData]);
    } else {
      setHasMore(false);
    }
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

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  const handleCardClick = (portfolio_id: number) => {
    console.log(`${portfolio_id}에 해당하는 페이지로 이동`);
  };

  const onClickEditProfile = () => {
    // 수정 버튼 클릭 시 프로필 수정 페이지로 이동
    navigate("/edit_profile");
  };

  if (error) return <div>{error}</div>
  if (!profileData) return <div>Loading...</div>;

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
              <Swiper slidesPerView="auto" spaceBetween={10}>
                {techStacks.map((item, i) => (
                  <StyledSwiperSlide key={i}>
                    <TechStackWrapper>
                      <TechStack content={{ ...item }} onClick={() => {}} />
                    </TechStackWrapper>
                  </StyledSwiperSlide>
                ))}
              </Swiper>
            </TechStackList>
          </UserInfoLeft>
          <UserInfoRight>
            <ProfileImageWrapper>
              <TotalLikes>
                <img src={heartImg} alt="TotalLikes" />
                <p>{profileData.total_likes}</p>
              </TotalLikes>
              <ProfileImageInnerWrapper>
                <ProfileImage
                  src="https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300"
                  alt="프로필 사진"
                />
              </ProfileImageInnerWrapper>
              <EditProfile onClick={onClickEditProfile}>
                <img src={pencilImg} alt="프로필 수정" />
              </EditProfile>
            </ProfileImageWrapper>
            <ExternalLinkWrapper>
              <ExternalLink imgType={0} link="https://github.com/" />
              <ExternalLink imgType={1} link="https://instagram.com/username" />
              <ExternalLink imgType={2} link="https://velog.io/" />
            </ExternalLinkWrapper>
          </UserInfoRight>
        </UserInfo>
        <TabComponent tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <UserPortfolioList>
          {DummyData.length ? (
            visibleData.map((item, index) => (
              <PortfolioCard
                key={index}
                {...item}
                onClick={() => handleCardClick(item.portfolio_id)}
              />
            ))
          ) : (
            <EmptyPortfolio text={"등록된 작업물이 없습니다"} />
          )}
        </UserPortfolioList>
        {hasMore && <Indicator ref={loadMoreRef} />}
      </ProfileContainer>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
