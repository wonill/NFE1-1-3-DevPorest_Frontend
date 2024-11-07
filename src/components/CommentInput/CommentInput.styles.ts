import styled from "@emotion/styled";

export const CommentInputWrapper = styled.div`
  & {
    /* border: 2px solid black; */
    position: relative;
    padding: ${({ theme }) => theme.PADDINGS.SMALL} 0;
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};

    margin: 0;
    box-sizing: border-box;
  }

  .textBox {
    border: 1.5px solid transparent;
    min-height: 6rem;
    /* width: calc(100% - 2 * ${({ theme }) => theme.PADDINGS.X_SMALL}); */
    width: 100%;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    text-overflow: wrap;
    overflow: hidden;
    resize: vertical;
  }

  .textBox:focus {
    outline: 2px solid ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  }

  .buttons {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;
