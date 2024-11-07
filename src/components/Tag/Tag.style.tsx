import styled from "@emotion/styled";

export const StyledTag = styled.span<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) => (isActive ? "#3d34f3" : theme.COLORS.MAIN_BG)};
  border: solid 1px ${({ theme }) => theme.COLORS.MAIN_BLACK};
  color: ${({ isActive, theme }) => (isActive ? theme.COLORS.MAIN_BG : theme.COLORS.MAIN_BLACK)};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.SMALL};
  cursor: pointer;

  &:hover {
    border: solid 1px ${({ theme }) => theme.COLORS.MAIN_GREEN2};
    background-color: ${({ isActive }) => (isActive ? "#615aec" : "#dbdae6")};
  }
`;
