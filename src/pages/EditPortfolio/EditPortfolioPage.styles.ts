import styled from "@emotion/styled";

export const EditPortfolioPageWrapper = styled.section`
  & {
    background-color: rgba(from ${({ theme }) => theme.COLORS.MAIN_GRAY} r g b / 0.25);
  }
  .mw-900 {
    max-width: 900px;
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
    flex-wrap: wrap;
    height: fit-content;
  }

  div.input .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-bottom: 8px;
  }

  div.input img {
    width: 1.5rem;
    object-fit: cover;
  }

  .preview {
    max-width: 20%;
    object-fit: contain;
    border-radius: 8px;
  }

  .input.big {
    height: fit-content;
    display: flex;
    gap: 1rem;
  }

  .editor {
    margin-top: 2rem;
  }

  .submitBtn {
    display: flex;
    justify-content: end;
    padding-bottom: 1rem;
  }

  .links-section input {
    width: calc(100% - 34px);
  }

  .links-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;

    .link-item {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: ${({ theme }) => theme.COLORS.MAIN_GRAY};
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;

      a {
        color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
        text-decoration: none;
      }

      .remove-link-btn {
        border: none;
        background: none;
        color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
        cursor: pointer;
        padding: 0 4px;
      }
    }
  }

  .tech-stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tags-list {
    display: contents;
    flex-wrap: wrap;
    gap: 8px;
  }

  .linkAddBtn {
    background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
    border: solid 1px ${({ theme }) => theme.COLORS.MAIN_BLACK};
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
    /* padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.SMALL}; */
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      border: solid 1px #525b76;
      color: #525b76;
    }
  }
`;
