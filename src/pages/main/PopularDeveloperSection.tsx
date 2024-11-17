import { SectionTitle } from "./MainPage.style";

import {
  StyledPorpularDeveloperSection,
  PorpularDeveloperSectionWrapper,
  PorpularDeveloperInnerWrapper,
} from "./PopularDeveloperSection.style";

import DevProfile from "../../components/DevProfile/DevProfile";

import { getPopularUserProfile } from "../../api/get-user-profile";
import { useEffect, useState } from "react";
import { UserProfileResType } from "../../types/api-types/UserType";
import { useNavigate } from "react-router-dom";

const PopularDeveloperSection = () => {
  const navigate = useNavigate();
  const [popluarUserList, setPopularUserList] = useState<UserProfileResType[]>([]);

  useEffect(() => {
    const fetchPopularUserList = async () => {
      const result = await getPopularUserProfile();
      if (Array.isArray(result)) setPopularUserList(result);
    };
    fetchPopularUserList();
  }, []);
  return (
    <StyledPorpularDeveloperSection>
      <PorpularDeveloperSectionWrapper>
        <SectionTitle>데브포레스트 추천, HOT 개발자</SectionTitle>
        <PorpularDeveloperInnerWrapper>
          {popluarUserList.map((dummyDevProfile, i) => (
            <DevProfile
              key={i}
              profileImage={dummyDevProfile.profileImage}
              name={dummyDevProfile.name}
              category={dummyDevProfile.jobGroup}
              intro={dummyDevProfile.intro}
              techStacks={dummyDevProfile.techStack}
              onClick={() => navigate(`/profile/${dummyDevProfile.userID}`)}
            />
          ))}
        </PorpularDeveloperInnerWrapper>
      </PorpularDeveloperSectionWrapper>
    </StyledPorpularDeveloperSection>
  );
};

export default PopularDeveloperSection;
