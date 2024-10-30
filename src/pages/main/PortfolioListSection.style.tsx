import styled from "@emotion/styled";
export const StyledPortfolioListSection = styled.div`
  padding: ${({ theme }) => theme.PADDINGS.SMALL} 0
    calc(${({ theme }) => theme.PADDINGS.X_LARGE} * 2) 0;
`;

export const JobFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: ${({ theme }) => theme.PADDINGS.MEDIUM};
`;

export const SortSelect = styled.div`
  position: relative;

  margin: ${({ theme }) => theme.PADDINGS.X_SMALL} 0
    ${({ theme }) => theme.PADDINGS.LARGE} 0;
`;

export const PortfolioList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  @media (max-width: 300px) {
    grid-template-columns: 1fr;
  }
`;
