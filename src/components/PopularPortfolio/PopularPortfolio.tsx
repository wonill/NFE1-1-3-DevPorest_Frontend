import React from "react";
import { PopularPortfolioContainer, ImageWrapper, InfoWrapper } from "./PopularPortfolio.styles";

export interface PopularPortfolioType {
  id: string;
  image: string;
  title: string;
  name: string;
  job: string;
}

const PopularPortfolio: React.FC<PopularPortfolioType> = ({ id, image, title, name, job }) => {
  return (
    <PopularPortfolioContainer onClick={() => console.log(id)}>
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
