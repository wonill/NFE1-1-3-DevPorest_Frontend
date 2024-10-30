import styled from "@emotion/styled";

export const StyledPopularPortfolioSection = styled.div`
  padding: calc(${({ theme }) => theme.PADDINGS.X_LARGE} * 2) 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  > div {
    width: auto;
  }
`;
