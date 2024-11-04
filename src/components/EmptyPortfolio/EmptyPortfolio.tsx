import { StyledEmptyPortfolio } from "./EmptyPortfolio.style";
import emptyPortfolioImg from "../../assets/empty_portfolio_icon.svg";

interface EmptyPortfolioProps {
  text: string;
}

const EmptyPortfolio: React.FC<EmptyPortfolioProps> = ({ text }) => {
  return (
    <StyledEmptyPortfolio>
      <div>
        <img src={emptyPortfolioImg} alt="포트폴리오 없음" />
      </div>
      <div>{text}</div>
    </StyledEmptyPortfolio>
  );
};

export default EmptyPortfolio;
