import styled from "@emotion/styled";

interface ButtonProps {
  text: string;
  colorType: number;
  isDisabled: boolean;
  onClick?: () => void;
}

interface ButtonWrapperProps {
  colorType: number;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  .btn {
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
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
          return "transparent";
      }
    }};
  }
`;

const Button: React.FC<ButtonProps> = ({
  text,
  colorType,
  isDisabled,
  onClick,
}) => {
  return (
    <ButtonWrapper colorType={colorType} onClick={onClick}>
      <button className="btn" disabled={!isDisabled}>
        {text}
      </button>
    </ButtonWrapper>
  );
};

export default Button;
