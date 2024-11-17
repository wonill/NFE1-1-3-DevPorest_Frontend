/** @jsxImportSource @emotion/react */
import React from "react";
import { Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/swiper-bundle.css";
import TechStack from "../TechStack/TechStack";
import {
  DevProfileCard,
  Image,
  Name,
  Category,
  Intro,
  TechStacks,
  StyledSwiperSlide,
} from "./DevProfile.styles";
import { ITechStackType } from "../../types/api-types/TechStackType";

export interface DevProfileType {
  profileImage: string;
  name: string;
  category: string;
  intro: string;
  techStacks: ITechStackType[];
  onClick: () => void;
}

const DevProfile: React.FC<DevProfileType> = ({
  profileImage,
  name,
  category,
  intro,
  techStacks,
  onClick,
}) => {
  return (
    <DevProfileCard onClick={onClick}>
      <Image>
        <img src={profileImage} alt="" />
      </Image>
      <Name>{name}</Name>
      <Category>{category}</Category>
      <Intro>{intro}</Intro>
      <TechStacks>
        <Swiper slidesPerView="auto" spaceBetween={10} freeMode={true} modules={[FreeMode]}>
          {techStacks.map((techStack: ITechStackType, i) => (
            <StyledSwiperSlide key={i}>
              <TechStack content={{ ...techStack }} onClick={() => {}} />
            </StyledSwiperSlide>
          ))}
        </Swiper>
      </TechStacks>
    </DevProfileCard>
  );
};

export default DevProfile;
