/** @jsxImportSource @emotion/react */
import React from 'react';
import { Swiper } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import TechStack, { TechStackType } from '../TechStack/TechStack';
import {
  DevProfileCard,
  Image,
  Name,
  Category,
  Intro,
  TechStacks,
  StyledSwiperSlide,
} from './DevProfile.styles';

export interface DevProfileType {
  profileImage: string;
  name: string;
  category: string;
  intro: string;
  techStacks: Array<TechStackType>;
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
        <img src={profileImage} alt='' />
      </Image>
      <Name>{name}</Name>
      <Category>{category}</Category>
      <Intro>{intro}</Intro>
      <TechStacks>
        <Swiper slidesPerView='auto' spaceBetween={10} freeMode={true} modules={[FreeMode]}>
          {techStacks.map((techStack: TechStackType, i) => (
            <StyledSwiperSlide key={i}>
              <TechStack
                name={techStack.name}
                backgroundColor={techStack.backgroundColor}
                color={techStack.color}
                onClick={techStack.onClick}
              />
            </StyledSwiperSlide>
          ))}
        </Swiper>
      </TechStacks>
    </DevProfileCard>
  );
};

export default DevProfile;
