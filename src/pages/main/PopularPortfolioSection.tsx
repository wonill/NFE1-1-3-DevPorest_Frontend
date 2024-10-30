import { StyledPopularPortfolioSection } from "./PopularPortfolioSection.style";
import PopularPortfolio from "../../components/PopularPortfolio/PopularPortfolio";

import { popularPortfolioData } from "../../data/mainPageData";

const PopularPortfolioSection = () => {
  return (
    <StyledPopularPortfolioSection>
      {popularPortfolioData.map((portfolio) => (
        <PopularPortfolio
          key={portfolio.id}
          {...portfolio}
          onClick={() => console.log(portfolio.id)}
        />
      ))}
    </StyledPopularPortfolioSection>
  );
};

export default PopularPortfolioSection;
