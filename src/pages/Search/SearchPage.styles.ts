import styled from "@emotion/styled";
import { SwiperSlide } from "swiper/react";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 0 ${({ theme }) => theme.PADDINGS.X_LARGE};

  > h2 {
    font-size: ${({ theme }) => theme.FONT_SIZE.HEADING2};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICKER};
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
    padding-top: ${({ theme }) => theme.PADDINGS.X_LARGE};
    text-align: center;
  }

  > p {
    font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THIN};
    color: ${({ theme }) => theme.COLORS.MAIN_GREEN2};
    padding-top: ${({ theme }) => theme.PADDINGS.X_SMALL};
    text-align: center;
  }
`;

export const SearchSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 1px solid ${({ theme }) => theme.COLORS.MAIN_GREEN};
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  margin: ${({ theme }) => theme.PADDINGS.X_LARGE} auto;
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};

  &:focus-within {
    border-color: ${({ theme }) => theme.COLORS.MAIN_GREEN2};
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
    color: inherit;
    padding: 0 ${({ theme }) => theme.PADDINGS.X_SMALL};
    margin-left: ${({ theme }) => theme.PADDINGS.SMALL};
    border-left: 1px solid ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }
`;

export const Select = styled.select`
  border: none;
  background-color: transparent;
  color: inherit;
  padding: 0 ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 2)`};
  cursor: pointer;
  outline: none;
`;

export const SearchIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  cursor: pointer;
  margin: 0 ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 3)`};

  img {
    width: 100%;
    height: 100%;
  }
`;

export const FilterSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    margin: 0;
  }
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.PADDINGS.X_SMALL};
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

export const Sorting = styled.div`
  display: flex;
  align-items: center;

  > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
    color: ${({ theme }) => theme.COLORS.MAIN_GREEN2};
  }
`;

export const PortfolioSection = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  padding-top: 20px;

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

export const Indicator = styled.div`
  height: 20px;
  margin: 20px 0;
`;
