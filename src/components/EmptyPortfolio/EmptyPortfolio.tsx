import { StyledEmptyPortfolio } from "./EmptyPortfolio.style";

interface EmptyPortfolioProps {
  text: string;
}

const EmptyPortfolio: React.FC<EmptyPortfolioProps> = ({ text }) => {
  return (
    <StyledEmptyPortfolio>
      <div>
        <img src="/src/assets/empty_portfolio_icon.svg" alt="포트폴리오 없음" />
      </div>
      <div>{text}</div>
    </StyledEmptyPortfolio>
  );
};

export default EmptyPortfolio;
