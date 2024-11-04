import styled from "@emotion/styled";
import {SwiperSlide } from "swiper/react";

export const ProfilePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 0;
`;

export const ProfileContainer = styled.div`
  max-width: 1100px;
  width: 90%;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const UserInfoLeft = styled.div`
  padding: 2rem 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
    padding-top: 0;
    padding-bottom: 2rem;
  }
`;

export const UserInfoRight = styled.div``;

export const TechStackList = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  max-width: 700px;
  overflow: hidden;
  cursor: grab;

  > div {
    display: flex;
    gap: 10px;
  }

  @media (max-width: calc(1100px + 2rem)) {
    max-width: 50dvw;
  }
  @media (max-width: calc(768px)) {
    align-self: center;
  }
`;

export const TechStackWrapper = styled.div`
  pointer-events: none;
`;

export const EditProfile = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  > img {
    transform: translate(12px, 14px);
    scale: 1.1;
  }
`;

export const TotalLikes = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  left: -7dvw;
  > img {
    scale: 0.7;
  }

  @media (max-width: 768px) {
    left: -4rem;
  }
`;

export const ExternalLinkWrapper = styled.div`
  padding: ${({ theme }) => theme.PADDINGS.SMALL};
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

export const UserPortfolioList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
`;


export const StyledSwiperSlide = styled(SwiperSlide)`
  width: fit-content;
  display: flex;
`;

export const Indicator = styled.div`
  height: 20px;
  margin: 20px 0;
`;
