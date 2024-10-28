import styled from "@emotion/styled";

export const StyledTag = styled.span`
  background-color: ${({theme}) => theme.COLORS.MAIN_BG};
  border: solid 1px ${({ theme }) => theme.COLORS.MAIN_BLACK};
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  font-weight: ${({theme}) => theme.FONT_WEIGHT.THICK};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.SMALL};
  cursor: pointer;

  &:hover{
    border: solid 1px #525B76;
    color: #525B76;
  }
`;
