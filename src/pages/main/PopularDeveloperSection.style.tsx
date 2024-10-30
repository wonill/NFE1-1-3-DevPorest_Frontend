import styled from "@emotion/styled";

export const StyledPorpularDeveloperSection = styled.div`
  width: 100%;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
`;

export const PorpularDeveloperSectionWrapper = styled.div`
  padding: ${({ theme }) => theme.PADDINGS.X_LARGE} 0
    calc(${({ theme }) => theme.PADDINGS.X_LARGE} * 2) 0;
  width: 100%;
  max-width: calc(100% - 8rem);

  @media (max-width: 1143px) {
    max-width: calc(100% - 2rem);
  }

  @media (max-width: 700px) {
    max-width: calc(100% - 1rem);
  }
`;

export const PorpularDeveloperInnerWrapper = styled.div`
  margin-top: ${({ theme }) => theme.PADDINGS.X_LARGE};
  display: flex;
  justify-content: space-between;
`;
