import {useState, useEffect} from 'react';
import { StyledPopularPortfolioSection } from "./PopularPortfolioSection.style";
import PopularPortfolio from "../../components/PopularPortfolio/PopularPortfolio";

import { getPortfolios } from "../../api/get-portfolios";
import { DetailPortfolioType } from "../../types/api-types/PortfolioType";
import { useNavigate } from 'react-router-dom';

const searchParams = new URLSearchParams({
  jobGroup: 'all',
  techStacks: '',
  searchType: 'title',
  keyword: '',
  sort: 'likes',
  page: '1',
  limit: '3'
}).toString();

const PopularPortfolioSection = () => {
  const navigate = useNavigate();

  const [popularPortfolioList, setPopularPortfolioList] = useState<DetailPortfolioType[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const result = await getPortfolios(searchParams);
        if (result) {
          console.log(result.data);
          setPopularPortfolioList(result.data);
        }
      } catch (error) {
        console.error('포트폴리오 불러오기 실패:', error);
      }
    };
    fetchPortfolios();
  }, []);
  return (
    <StyledPopularPortfolioSection>
      {popularPortfolioList.map((portfolio) => (
        <PopularPortfolio
          key={portfolio._id}
          id={portfolio._id}
          image={portfolio.thumbnailImage}
          title={portfolio.title}
          name={portfolio.userInfo.name}
          job={portfolio.jobGroup!}
          onClick={() => navigate(`detail?portfolio_id=${portfolio._id}`)}
        />
      ))}
    </StyledPopularPortfolioSection>
  );
};

export default PopularPortfolioSection;
