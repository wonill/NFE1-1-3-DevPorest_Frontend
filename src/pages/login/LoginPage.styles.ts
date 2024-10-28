import styled from "@emotion/styled";

export const LoginPageWrapper = styled.div`
  & {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wrap {
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
    width: 500px;
    height: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(
      from ${({ theme }) => theme.COLORS.LIGHTGREEN_BG} r g b/ 0.6
    );
    border: 2px solid ${({ theme }) => theme.COLORS.LIGHTGREEN_SUB};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  }

  .logo {
    margin-bottom: 4rem;
  }

  .wrap > i:nth-of-type(1) {
    font-size: ${({ theme }) => theme.FONT_SIZE.HEADING3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICKER};
    margin-bottom: 4rem;
  }

  .wrap > i:nth-of-type(2) {
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.DEFAULT};
    margin-bottom: 2rem;
  }
`;
