import PopularPortfolioSection from "./PopularPortfolioSection";
import PortfolioListSection from "./PortfolioListSection";
import PopularDeveloperSection from "./PopularDeveloperSection";
import GraphSection from "./GraphSection";
import { MainPageWrapper } from "./MainPage.style";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <PopularPortfolioSection></PopularPortfolioSection>
      <PortfolioListSection></PortfolioListSection>
      <PopularDeveloperSection></PopularDeveloperSection>
      <GraphSection></GraphSection>
    </MainPageWrapper>
  );
};

export default MainPage;
