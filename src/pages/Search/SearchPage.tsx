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
import Tag from "../../components/Tag/Tag";
import TechStack2 from "../../components/TechStack2/TechStack2";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getJobGroup } from "../../api/get-job-group";
import { JobGroupType } from "../../types/api-types/JobGroup";
import { getTechStacks } from "../../api/get-tech-stacks";
import { ITechStackType } from "./../../types/api-types/TechStackType";
import useStoreSearchPage from "../../store/store-search-page";
import { buildSearchQuery } from "../../utils/build-search-query";
import { DetailPortfolioType } from "../../types/api-types/PortfolioType";
import { getPortfolios } from "../../api/get-portfolios";

/**
 * todo
 * 페이지네이션 저장해놓고 hasNextpage 없으면 더이상 페이지 증가하지 않게
 */

interface pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

const SearchPage: React.FC = () => {
  const [jobGroups2, setJobGroups] = useState<JobGroupType[] | null>(null);
  const [techStacks2, setTechStacks] = useState<ITechStackType[] | null>(null);
  const [filteredTechStacks, setFilteredTechStacks] = useState<ITechStackType[] | null>(null);
  const [portfolioList, setPortfolioList] = useState<DetailPortfolioType[] | null>(null);
  const [pagination, setPagination] = useState<pagination | null>(null);
  const [pageTitle, setPageTitle] = useState<string>("");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { searchParams, setSearchParams } = useStoreSearchPage();

  const loadMoreData = async () => {
    if (pagination?.hasNextPage) {
      const newPortfolios = await getPortfolios(buildSearchQuery(searchParams));
      setPortfolioList(newPortfolios?.data!);
      // setSearchParams({ page: searchParams.page + 1 });
    }
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
  }, [portfolioList]);

  useEffect(() => {
    fetchPortfolio();
  }, [searchParams.techStacks, searchParams.jobGroup]);

  useEffect(() => {
    const fetchJobGroup = async () => {
      const jobGroupData = await getJobGroup();
      if (Array.isArray(jobGroupData)) setJobGroups(jobGroupData);
    };

    const fetchTechStacks = async () => {
      const techStackData = await getTechStacks();
      if (Array.isArray(techStackData)) {
        setTechStacks(techStackData);
        setFilteredTechStacks(techStackData);
      }
    };

    fetchJobGroup();
    fetchTechStacks();
    fetchPortfolio();
    setSearchParams({ page: 1 });
  }, []);

  const fetchPortfolio = async () => {
    const portfolioData = await getPortfolios(buildSearchQuery(searchParams));
    if ("data" in portfolioData!) setPortfolioList(portfolioData.data);
    if ("pagination" in portfolioData!) setPagination(portfolioData.pagination!);
  };

  const handleTagClick = (job: JobGroupType) => {
    const updatedJobGroup = job.job === "All" ? "all" : job.job;
    setSearchParams({ jobGroup: updatedJobGroup });

    if (job.job === "All") {
      setFilteredTechStacks(techStacks2!);
    } else {
      const filteredStacks = techStacks2!.filter(stack => stack.jobCode === job._id);
      setFilteredTechStacks(filteredStacks);
    }
  };

  const handleTechStackClick = (techStack: string) => {
    const currentTechStacks = searchParams.techStacks.split(",").map(stack => stack.trim());

    if (currentTechStacks.includes(techStack)) {
      // 기술 스택이 이미 선택된 경우 삭제
      const updatedTechStacks = currentTechStacks
        .filter(stack => stack !== techStack)
        .join(", ")
        .trim();
      setSearchParams({ techStacks: updatedTechStacks });
    } else {
      // 기술 스택이 선택되지 않은 경우 추가
      const updatedTechStacks = [...currentTechStacks, techStack].filter(Boolean).join(",").trim();
      setSearchParams({ techStacks: updatedTechStacks });
    }
  };

  const handleSearch = async () => {
    const portfolios = await getPortfolios(buildSearchQuery(searchParams));
    setPortfolioList(portfolios?.data!);
    setPagination(portfolios?.pagination!);
    setPageTitle(searchParams.keyword);
  };

  console.log(buildSearchQuery(searchParams));
  console.log(portfolioList);

  return (
    <Main>
      <h2>{pageTitle && `${pageTitle}에 대한 검색 결과`}</h2>
      <p>{pagination?.totalCount}개의 포트폴리오를 발견하였습니다.</p>
      <SearchSection>
        <Select
          onChange={e => {
            const searchValue = e.target.value;
            setSearchParams({ searchType: searchValue });
          }}
        >
          <option value="title">제목</option>
          <option value="user">개발자</option>
          <option value="tag">태그</option>
        </Select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={e => setSearchParams({ keyword: e.target.value })}
        />
        <SearchIconContainer onClick={handleSearch}>
          <img src="/search-icon.svg" alt="검색 아이콘" />
        </SearchIconContainer>
      </SearchSection>
      <FilterSection>
        <Swiper slidesPerView="auto" spaceBetween={10}>
          <Category>
            {jobGroups2?.map(job => (
              <StyledSwiperSlide key={job._id}>
                <Tag key={job._id} content={job.job} onClick={() => handleTagClick(job)} />
              </StyledSwiperSlide>
            ))}
          </Category>
        </Swiper>

        <TechStackWrapper>
          <Swiper slidesPerView="auto" spaceBetween={10}>
            {filteredTechStacks?.map((item, i) => (
              <StyledSwiperSlide key={i}>
                <TechStackWrapper>
                  <TechStack2
                    content={{ ...item }}
                    onClick={() => handleTechStackClick(item.skill)}
                  />
                </TechStackWrapper>
              </StyledSwiperSlide>
            ))}
          </Swiper>
        </TechStackWrapper>
        <Sorting>
          <span>정렬 방식</span>
          <Select
            onChange={e => {
              const sortValue = e.target.value;
              setSearchParams({ sort: sortValue });
            }}
          >
            <option value="latest">최신순</option>
            <option value="views">조회수순</option>
            <option value="likes">좋아요순</option>
          </Select>
        </Sorting>
      </FilterSection>
      <PortfolioSection>
        {portfolioList?.map(data => (
          <PortfolioCard
            key={data._id}
            portfolio_id={data._id}
            title={data.title}
            thumbnailImg={data.thumbnailImage}
            profileImg={data.userInfo.profileImage}
            userName={data.userInfo.name}
            views={data.view}
            likes={data.likeCount}
            onClick={() => console.log("clicked")} // detail 페이지로 라우팅 id 넣어서
          />
        ))}
      </PortfolioSection>
      <Indicator ref={loadMoreRef} />
    </Main>
  );
};

export default SearchPage;
