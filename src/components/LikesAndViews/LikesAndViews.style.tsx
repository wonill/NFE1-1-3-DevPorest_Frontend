import styled from "@emotion/styled";

export const StatsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICKER};

  > span {
    gap: 2px;
    display: flex;
  }
`;
