/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Button = styled.button<{ backgroundColor: string; color: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.SMALL};
  border: none;
  border-radius: 100rem;
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
`;
