import styled from "@emotion/styled";

export const MainPageWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;

  > div:not(:nth-of-type(3)) {
    width: 100%;
    max-width: calc(100% - 8rem);

    @media (max-width: 1143px) {
      max-width: calc(100% - 2rem);
    }

    @media (max-width: 700px) {
      max-width: calc(100% - 2rem);
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
`;
