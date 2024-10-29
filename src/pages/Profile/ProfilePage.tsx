import { useNavigate } from "react-router-dom";
import { Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
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
  EditProfile,
  TotalLikes,
  ExternalLinkWrapper,
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

const ProfilePage = () => {
  const navigate = useNavigate();

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
                    <img
                      src="/src/assets/profile_page_phone.svg"
                      alt="전화번호"
                    />
                  </span>
                  <p>010-1234-1234</p>
                </TelWrapper>
                <EmailWrpper>
                  <span>
                    <img
                      src="/src/assets/profile_page_email.svg"
                      alt="이메일"
                    />
                  </span>
                  <p>email@gmail.com</p>
                </EmailWrpper>
              </Contact>
              <Intro>
                안녕하세요, 주니어 프론트엔드 개발자 홍길동입니다. 저는 현재
                포트폴리오 플랫폼에서 다양한 프로젝트를 진행하며 웹 개발의
                기초부터 심화까지 폭넓은 경험을 쌓고 있습니다.
              </Intro>
            </UserDetails>
            <TechStackList>
              <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
              >
                {dummyTechStacks.map((item, i) => (
                  <StyledSwiperSlide key={i}>
                    <TechStack
                      name={item.name}
                      backgroundColor={item.backgroundColor}
                      color={item.color}
                      onClick={item.onClick}
                    />
                  </StyledSwiperSlide>
                ))}
              </Swiper>
            </TechStackList>
          </UserInfoLeft>
          <UserInfoRight>
            <ProfileImageWrapper>
              <TotalLikes>
                <img src="/src/assets/active_heart.svg" alt="TotalLikes" />
                <p>274</p>
              </TotalLikes>
              <ProfileImageInnerWrapper>
                <ProfileImage
                  src="https://cdn-bastani.stunning.kr/prod/users/9b7d25c3-41e6-4da0-91d6-1ade3e3e68c6/avatar/youandiii_face.jpg.small?q=80&t=crop&s=300x300"
                  alt="프로필 사진"
                />
              </ProfileImageInnerWrapper>
              <EditProfile onClick={onClickEditProfile}>
                <img src="/src/assets/pencil.svg" alt="프로필 수정" />
              </EditProfile>
            </ProfileImageWrapper>
            <ExternalLinkWrapper>
              {/* 외부 링크 주소 */}
              <ExternalLink imgType={0} link="https://github.com/" />
              <ExternalLink imgType={1} link="https://instagram.com/username" />
              <ExternalLink imgType={2} link="https://velog.io/" />
            </ExternalLinkWrapper>
          </UserInfoRight>
        </UserInfo>
        <UserPortfolioList>
          {DummyData.map((item, index) => (
            <PortfolioCard
              key={index}
              {...item}
              onClick={() => handleCardClick(item.portfolio_id)}
            />
          ))}
        </UserPortfolioList>
      </ProfileContainer>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
