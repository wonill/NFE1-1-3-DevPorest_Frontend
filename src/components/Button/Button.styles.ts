import styled from "@emotion/styled";

interface ButtonWrapperProps {
  colorType: number;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  .btn {
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.MEDIUM};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
    display: inline;

    cursor: pointer;

    /* 테두리 설정 */
    border: 1.5px solid
      ${({ theme, colorType }) => {
        switch (colorType) {
          case 1:
            return theme.COLORS.MAIN_GRAY;
          case 2:
          case 3:
            return theme.COLORS.MAIN_GREEN;
          default:
            return "transparent";
        }
      }};

    /* 배경색 설정 */
    background-color: ${({ theme, colorType }) => {
      switch (colorType) {
        case 1:
        case 2:
          return theme.COLORS.MAIN_BG;
        case 3:
          return theme.COLORS.MAIN_GREEN;
        default:
          return "transparent";
      }
    }};

    /* 글자 색상 설정 */
    color: ${({ theme, colorType }) => {
      switch (colorType) {
        case 1:
          return theme.COLORS.MAIN_BLACK;
        case 2:
          return theme.COLORS.MAIN_GREEN;
        case 3:
          return theme.COLORS.MAIN_BG;
        default:
          return theme.COLORS.MAIN_BLACK;
      }
    }};
  }

  .btn.disabled {
    cursor: default;
    border: 1.5px solid ${({ theme }) => theme.COLORS.MAIN_BG};
    background-color: ${({ theme }) => theme.COLORS.MAIN_GRAY};
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};

    opacity: 0.2;
  }
  .btn:hover.active {
    /* 테두리 설정 */
    border: 1.5px solid
      ${({ theme, colorType }) => {
        switch (colorType) {
          case 1:
            return theme.COLORS.MAIN_GRAY;
          case 2:
          case 3:
            return theme.COLORS.MAIN_GREEN;
          default:
            return "transparent";
        }
      }};

    /* 배경색 설정 */
    background-color: ${({ theme, colorType }) => {
      switch (colorType) {
        case 1:
          return theme.COLORS.MAIN_GRAY;
        case 2:
          return theme.COLORS.MAIN_GREEN;
        case 3:
          return theme.COLORS.MAIN_GREEN;
        default:
          return "transparent";
      }
    }};

    /* 글자 색상 설정 */
    color: ${({ theme, colorType }) => {
      switch (colorType) {
        case 1:
        case 2:
        case 3:
          return theme.COLORS.MAIN_BG;
        default:
          return theme.COLORS.MAIN_GREEN;
      }
    }};
  }
`;
