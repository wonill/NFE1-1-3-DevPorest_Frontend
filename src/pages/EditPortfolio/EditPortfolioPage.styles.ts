import styled from "@emotion/styled";

export const EditPortfolioPageWrapper = styled.section`
  & {
    background-color: rgba(
      from ${({ theme }) => theme.COLORS.MAIN_GRAY} r g b / 0.25
    );
    height: 80vh;
  }
  .mw-800 {
    max-width: 700px;
    margin: 0 auto;

    padding-top: 1.5rem;
  }

  input {
    border: none;
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
    font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.DEFAULT};
  }
  input:focus {
    outline: transparent;
  }

  .input {
    display: block;
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
    margin: 1rem 0;

    height: 3rem;
  }

  div.input {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  div.input img {
    width: 1.5rem;
    object-fit: cover;
  }

  .preview {
    max-width: 20%;
    object-fit: contain;
  }

  .input.big {
    height: 4rem;
    display: flex;
    gap: 1rem;
  }
`;
