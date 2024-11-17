import styled from "@emotion/styled";

export const UserInfoInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.PADDINGS.X_SMALL};
`;

export const IconWrapper = styled.div`
  width: 30px;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 2)`};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  border: 1px solid ${({ error, theme }) => (error ? theme.COLORS.RED : theme.COLORS.MAIN_GRAY)};
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};

  &:focus {
    outline: 1px solid ${({ error, theme }) => (error ? theme.COLORS.RED : theme.COLORS.MAIN_GREEN)};
  }
`;
