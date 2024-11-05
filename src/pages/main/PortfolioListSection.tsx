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
import { Swiper } from "swiper/react";
import { TechStackWrapper, StyledSwiperSlide } from "./PortfolioListSection.style";
import TechStack2 from "../../components/TechStack2/TechStack2";
import { ITechStackType } from "../../types/api-types/TechStackType";
import useStoreSearchPage from "../../store/store-search-page";
import { getPortfolios } from "../../api/get-portfolios";
import { DetailPortfolioType } from "../../types/api-types/PortfolioType";
import { buildSearchQuery } from "../../utils/build-search-query";
import { getJobGroup } from "../../api/get-job-group";
import { JobGroupType } from "../../types/api-types/JobGroup";
import { getTechStacks } from "../../api/get-tech-stacks";
import { DummyData } from "../../data/mainPageData";

type SortMapType = {
  [key: string] : string;
}

const sortMap:SortMapType = {
  '최신순' : 'latest',
  '좋아요순' : 'likes',
  '조회수순' : 'views'
}


const PortfolioListSection = () => {
  const [filteredTechStacks, setFilteredTechStacks] = useState<ITechStackType[] | null>(null);
  const [selectedTechStack, setSelectedTechStack] = useState<string[] | null>(null);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("최신순");
  const [jobGroups2, setJobGroups] = useState<JobGroupType[] | null>(null);
  const [techStacks2, setTechStacks] = useState<ITechStackType[] | null>(null);
  const [portfolioList, setPortfolioList] = useState<DetailPortfolioType[]>();
  const { searchParams, setSearchParams } = useStoreSearchPage();


  const fetchPortfolio = async () => {
    const portfolioData = await getPortfolios(buildSearchQuery(searchParams));
    if ("data" in portfolioData!) setPortfolioList(portfolioData.data);
  };

  useEffect(() => {
    console.log('서치파람', searchParams);
  }, [searchParams])

    useEffect(() => {
      fetchPortfolio();
    }, [searchParams.techStacks, searchParams.jobGroup, searchParams.sort]);

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
    }, []);


  const handleCardClick = (portfolio_id: string) => {
    console.log(`${portfolio_id}에 해당하는 디테일 페이지로 이동`);
  };

  const handleActive = (skill: string) => {
    if (selectedTechStack?.includes(skill)) return true;
    return false;
  };

  const handleTagClick = (job: JobGroupType) => {
    if (job.job === searchParams.jobGroup) return;

    const updatedJobGroup = job.job === "All" ? "all" : job.job;
    setSearchParams({ jobGroup: updatedJobGroup });
    setSearchParams({ techStacks: "" });
    setSelectedTechStack([]);

    if (job.job === "All") {
      setFilteredTechStacks(techStacks2);
    } else {
      const filteredStacks = techStacks2!.filter(stack => stack.jobCode === job._id);
      setFilteredTechStacks(filteredStacks);
    }
  };

  const handleTechStackClick = (techStack: string) => {
    const currentTechStacks = searchParams.techStacks.split(",").map(stack => stack.trim());
    
    if (currentTechStacks.includes(techStack)) {
      const updatedTechStacks = currentTechStacks
      .filter(stack => stack !== techStack)
        .join(", ")
        .trim();
        setSearchParams({ techStacks: updatedTechStacks });
      setSelectedTechStack(selectedTechStack!.filter(stack => stack !== techStack));
    } else {
      const updatedTechStacks = [...currentTechStacks, techStack].filter(Boolean).join(",").trim();
      setSearchParams({ techStacks: updatedTechStacks });
      selectedTechStack ? setSelectedTechStack([...selectedTechStack, techStack]) : setSelectedTechStack([techStack]);
    }
  };

  useEffect(() => {
    console.log(`선택된 정렬 방식: ${selectedSortOption}`);
  }, [selectedSortOption]);

  const handleSortChange = (option: string) => {
    setSelectedSortOption(option);
    setSearchParams({sort: sortMap[option]})
  };
  return (
    <StyledPortfolioListSection>
      <SectionTitle>다양한 포트폴리오를 확인해보세요</SectionTitle>
      <JobFilterContainer>
            {jobGroups2?.map(job => (
              <StyledSwiperSlide key={job._id}>
                <Tag key={job._id} content={job.job} onClick={() => handleTagClick(job)} />
              </StyledSwiperSlide>
            ))}
      </JobFilterContainer>
      <TechStackWrapper>
          <Swiper slidesPerView="auto" spaceBetween={10}>
            {filteredTechStacks?.map((item, i) => (
              <StyledSwiperSlide key={i}>
                <TechStackWrapper>
                  <TechStack2
                    content={{ ...item }}
                    isActive={handleActive(item.skill)}
                    onClick={() => handleTechStackClick(item.skill)}
                  />
                </TechStackWrapper>
              </StyledSwiperSlide>
            ))}
          </Swiper>
        </TechStackWrapper>
      <SortSelect>
        <SortingDropdown
          options={["최신순", "조회수순", "좋아요순"]}
          onSelect={handleSortChange}
          selectedSortOption={selectedSortOption}
        />
      </SortSelect>
      <PortfolioList>
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
            onClick={() => handleCardClick(data._id)}
          />
        ))}
      </PortfolioList>
    </StyledPortfolioListSection>
  );
};

export default PortfolioListSection;
