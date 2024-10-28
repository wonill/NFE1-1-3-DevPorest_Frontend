import React from "react";
import { PopularPortfolioContainer, ImageWrapper, InfoWrapper } from "./PopularPortfolio.styles";

export interface PopularPortfolioType {
  id: string;
  image: string;
  title: string;
  name: string;
  job: string;
  onClick: () => void;
}

const PopularPortfolio: React.FC<PopularPortfolioType> = ({ image, title, name, job, onClick }) => {
  return (
    <PopularPortfolioContainer onClick={onClick}>
      <ImageWrapper>
        <img src={image} alt="Popular Portfolio" />
        <InfoWrapper>
          <p>{title}</p>
          <p>
            {name} / {job}
          </p>
        </InfoWrapper>
      </ImageWrapper>
    </PopularPortfolioContainer>
  );
};

export default PopularPortfolio;
