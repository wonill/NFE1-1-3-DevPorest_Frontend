import styled from "@emotion/styled";
import { SwiperSlide } from "swiper/react";

export const StyledPortfolioListSection = styled.div`
  padding: ${({ theme }) => theme.PADDINGS.SMALL} 0
    calc(${({ theme }) => theme.PADDINGS.X_LARGE} * 2) 0;
`;

export const JobFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: ${({ theme }) => theme.PADDINGS.MEDIUM};
`;

export const TechStackWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: ${({ theme }) => theme.PADDINGS.X_SMALL};

  > div {
    width: 100%;
  }
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  width: fit-content;
  display: flex;
`;


export const SortSelect = styled.div`
  position: relative;

  margin: -10px 0
    ${({ theme }) => theme.PADDINGS.MEDIUM} 0;
`;

export const PortfolioList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;
