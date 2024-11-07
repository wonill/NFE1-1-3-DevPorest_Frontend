import styled from "@emotion/styled";

export const Button = styled.button<{ color: string; isActive: boolean }>`
  margin-top: 10px;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  outline: none;
  border: 1px solid ${({ theme }) => theme.COLORS.MAIN_GRAY};
  background-color: ${({ isActive }) => (isActive ? `#88CD34` : "#FFFFFF")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  padding-left: ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} * 0.8)`};
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_SUB};

    > p {
      color: ${({ isActive }) => isActive && "#201E50"};
    }
  }

  > div {
    position: relative;
    padding: 0.8rem;
    background-color: ${({ color }) => color};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    border: none;

    &:before {
      content: "";
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
      border: ${({ isActive }) => (isActive ? "3px solid #FFFFFF" : "none")};
      pointer-events: none;
    }
  }

  > p {
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.X_SMALL};
    color: ${({ isActive }) => (isActive ? `#FFFFFF` : "#201E50")};
  }
`;
