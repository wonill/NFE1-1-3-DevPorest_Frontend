import React, { useEffect, useState, useRef } from "react";
import {
  Main,
  SearchSection,
  Select,
  SearchIconContainer,
  FilterSection,
  Category,
  TechStackWrapper,
  StyledSwiperSlide,
  Sorting,
  PortfolioSection,
  Indicator,
} from "./SearchPage.styles";
import { jobs } from "../../data/dummyData";
import Tag from "../../components/Tag/Tag";
import TechStack2 from "../../components/TechStack2/TechStack2";
import { DummyData } from "../../data/profilePageData";
import { techStacks } from "../../data/dummyData";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";

const SearchPage: React.FC = () => {
  const [visibleData, setVisibleData] = useState(DummyData.slice(0, 10));
  const [filteredTechStacks, setFilteredTechStacks] = useState(techStacks);
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

  const handleTagClick = (jobName: string) => {
    if (jobName === "전체") {
      setFilteredTechStacks(techStacks);
    } else {
      const filteredStacks = techStacks.filter(stack => stack.jobCode === jobName);
      setFilteredTechStacks(filteredStacks);
    }
  };

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
          <Tag key={0} content={"전체"} onClick={() => handleTagClick("전체")} />
          {jobs.slice(0, 3).map(job => (
            <Tag key={job.jobCode} content={job.name} onClick={() => handleTagClick(job.name)} />
          ))}
        </Category>
        <TechStackWrapper>
          <Swiper slidesPerView="auto" spaceBetween={10}>
            {filteredTechStacks.map((item, i) => (
              <StyledSwiperSlide key={i}>
                <TechStackWrapper>
                  <TechStack2 content={{ ...item }} onClick={() => {}} />
                </TechStackWrapper>
              </StyledSwiperSlide>
            ))}
          </Swiper>
        </TechStackWrapper>
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
