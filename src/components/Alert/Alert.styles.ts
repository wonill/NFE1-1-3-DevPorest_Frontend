import styled from "@emotion/styled";
interface AlertWrapperProps {
  visible: boolean;
}

export const AlertWrapper = styled.div<AlertWrapperProps>`
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  width: 30vw;
  font-size: ${({ theme }) => theme.FONT_SIZE.HEADING3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  text-align: center;
  padding: ${({ theme }) => theme.PADDINGS.SMALL};
  margin-top: 1rem;
  position: absolute;
  top: 0;
  left: calc(50% - 15vw);

  ${({ visible }) =>
    visible
      ? `
          opacity: 1;
          transform: translateY(0);
        `
      : `
          opacity: 0;
          transform: translateY(-20px);
        `}
  transition: 0.3s;
`;
