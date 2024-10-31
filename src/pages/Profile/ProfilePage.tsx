import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DummyData, dummyTechStacks } from "../../data/profilePageData.ts";
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

const tabs = ["나의 포레스트", "좋아요"];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("나의 포레스트");
  const [visibleData, setVisibleData] = useState(DummyData.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <ProfilePageWrapper>
      <ProfileContainer>
        <UserInfo>
          <UserInfoLeft>
            <UserDetails>
              <NameAndJob>
                <UserName>홍길동</UserName>
                <Job>Frontend Developer</Job>
              </NameAndJob>
              <Contact>
                <TelWrapper>
                  <span>
                    <img src={phoneImg} alt="전화번호" />
                  </span>
                  <p>010-1234-1234</p>
                </TelWrapper>
                <EmailWrpper>
                  <span>
                    <img src={emailImg} alt="이메일" />
                  </span>
                  <p>email@gmail.com</p>
                </EmailWrpper>
              </Contact>
              <Intro>
                안녕하세요, 주니어 프론트엔드 개발자 홍길동입니다. 저는 현재 포트폴리오 플랫폼에서
                다양한 프로젝트를 진행하며 웹 개발의 기초부터 심화까지 폭넓은 경험을 쌓고 있습니다.
              </Intro>
            </UserDetails>
            <TechStackList>
              <Swiper slidesPerView="auto" spaceBetween={10}>
                {dummyTechStacks.map((item, i) => (
                  <StyledSwiperSlide key={i}>
                    <TechStackWrapper>
                      <TechStack
                        name={item.name}
                        backgroundColor={item.backgroundColor}
                        color={item.color}
                        onClick={item.onClick}
                      />
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
                <p>274</p>
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
