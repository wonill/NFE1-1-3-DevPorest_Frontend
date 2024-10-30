import { useState, useEffect } from "react";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import { SectionTitle } from "./MainPage.style";
import {
  StyledPortfolioListSection,
  JobFilterContainer,
  SortSelect,
  PortfolioList,
} from "./PortfolioListSection.style";
import Tag from "../../components/Tag/Tag";
import SortingDropdown from "./SortingDropdown";
import { DummyData } from "../../data/mainPageData";

const PortfolioListSection = () => {
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("최신순");
  const handleCardClick = (portfolio_id: number) => {
    console.log(`${portfolio_id}에 해당하는 디테일 페이지로 이동`);
  };

  useEffect(() => {
    console.log(`선택된 정렬 방식: ${selectedSortOption}`);
  }, [selectedSortOption]);

  const handleSortChange = (option: string) => {
    setSelectedSortOption(option);
  };
  return (
    <StyledPortfolioListSection>
      <SectionTitle>다양한 포트폴리오를 확인해보세요</SectionTitle>
      <JobFilterContainer>
        <Tag content="전체"></Tag>
        <Tag content="Frontend Developer"></Tag>
        <Tag content="Backend Developer"></Tag>
      </JobFilterContainer>
      <SortSelect>
        <SortingDropdown
          options={["데브포레스트 픽", "최신순", "인기순"]}
          onSelect={handleSortChange}
          selectedSortOption={selectedSortOption}
        />
      </SortSelect>
      <PortfolioList>
        {DummyData.map((item, index) => (
          <PortfolioCard
            key={index}
            {...item}
            onClick={() => handleCardClick(item.portfolio_id)}
          />
        ))}
      </PortfolioList>
    </StyledPortfolioListSection>
  );
};

export default PortfolioListSection;
