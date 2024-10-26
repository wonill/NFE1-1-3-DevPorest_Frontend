import styled from "@emotion/styled";

interface StyledButtonProps {
  isLiked: boolean;
  text: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: 288px;
  height: 103px;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  border: solid 2px ${({ theme }) => theme.COLORS.MAIN_GREEN};
  background-color: ${({ theme, isLiked, text }) =>
    !isLiked && text === "좋아요"
      ? theme.COLORS.MAIN_BG
      : theme.COLORS.MAIN_GREEN};
  color: ${({ theme, isLiked, text }) =>
    !isLiked && text === "좋아요"
      ? theme.COLORS.MAIN_GREEN
      : theme.COLORS.MAIN_BG};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  font-size: 1rem;
  cursor: pointer;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;
