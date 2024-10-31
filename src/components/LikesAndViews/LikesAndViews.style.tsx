import styled from "@emotion/styled";

export const StatsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICKER};
  font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
  color: #7c8484;

  > span {
    gap: 2px;
    display: flex;
    align-items: center;
  }
`;
