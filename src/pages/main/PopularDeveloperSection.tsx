import { SectionTitle } from "./MainPage.style";

import {
  StyledPorpularDeveloperSection,
  PorpularDeveloperSectionWrapper,
  PorpularDeveloperInnerWrapper,
} from "./PopularDeveloperSection.style";

import DevProfile from "../../components/DevProfile/DevProfile";

import { dummyDevProfiles } from "../../data/mainPageData";

const PopularDeveloperSection = () => {
  return (
    <StyledPorpularDeveloperSection>
      <PorpularDeveloperSectionWrapper>
        <SectionTitle>데브포레스트 추천, HOT 개발자</SectionTitle>
        <PorpularDeveloperInnerWrapper>
          {dummyDevProfiles.map((dummyDevProfile, i) => (
            <DevProfile
              key={i}
              profileImage={dummyDevProfile.profileImage}
              name={dummyDevProfile.name}
              category={dummyDevProfile.category}
              intro={dummyDevProfile.intro}
              techStacks={dummyDevProfile.techStacks}
              onClick={dummyDevProfile.onClick}
            />
          ))}
        </PorpularDeveloperInnerWrapper>
      </PorpularDeveloperSectionWrapper>
    </StyledPorpularDeveloperSection>
  );
};

export default PopularDeveloperSection;
