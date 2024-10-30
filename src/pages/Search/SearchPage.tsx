import React, { useEffect, useState, useRef } from "react";
import {
  Main,
  SearchSection,
  Select,
  SearchIconContainer,
  FilterSection,
  Category,
  Sorting,
  PortfolioSection,
  Indicator,
} from "./SearchPage.styles";
import { jobs } from "../../data/dummyData";
import Tag from "../../components/Tag/Tag";
import { DummyData } from "../../data/profilePageData";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";

const SearchPage: React.FC = () => {
  const [visibleData, setVisibleData] = useState(DummyData.slice(0, 10));
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    const nextData = DummyData.slice(visibleData.length, visibleData.length + 5);
    setVisibleData(prev => [...prev, ...nextData]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMoreData();
        }
      });
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleData]);

  return (
    <Main>
      <h2>'리액트'에 대한 검색 결과</h2>
      <p>{DummyData.length}개의 포트폴리오를 발견하였습니다.</p>
      <SearchSection>
        <Select>
          <option value="filter1">검색 필터</option>
          <option value="filter1">개발자</option>
          <option value="filter2">태그</option>
        </Select>
        <input type="text" placeholder="검색어를 입력하세요" />
        <SearchIconContainer>
          <img src="/search-icon.svg" alt="검색 아이콘" />
        </SearchIconContainer>
      </SearchSection>
      <FilterSection>
        <Category>
          <Tag key={0} content={"전체"} />
          {jobs.slice(0, 3).map(job => (
            <Tag key={job.jobCode} content={job.name} />
          ))}
        </Category>
        <Sorting>
          <span>정렬 방식</span>
          <Select>
            <option value="filter1">인기순</option>
            <option value="filter1">최신순</option>
          </Select>
        </Sorting>
      </FilterSection>
      <PortfolioSection>
        {visibleData.map(data => (
          <PortfolioCard key={data.portfolio_id} {...data} onClick={() => console.log("clicked")} />
        ))}
      </PortfolioSection>
      <Indicator ref={loadMoreRef} />
    </Main>
  );
};

export default SearchPage;
