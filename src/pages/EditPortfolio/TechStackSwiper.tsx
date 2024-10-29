import { Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
import TechStack from "../../components/TechStack/TechStack";
import { TechStacks } from "../../components/DevProfile/DevProfile.styles";
import { StyledSwiperSlide } from "../Profile/ProfilePage.style";
import { TechStackType } from "../../data/profilePageData";

interface TechStackSwiperProps {
  items: TechStackType[];
}
const TechStackSwiper: React.FC<TechStackSwiperProps> = ({ items }) => {
  return (
    <TechStacks>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
      >
        {items.map((techStack: TechStackType, i) => (
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
  );
};
export default TechStackSwiper;
