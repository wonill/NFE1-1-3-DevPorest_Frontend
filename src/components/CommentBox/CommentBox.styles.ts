import styled from "@emotion/styled";

export const CommentBoxWrapper = styled.div`
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};

  & {
    position: relative;
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};

    margin: 0;
    margin-top: 1rem;
    box-sizing: border-box;
  }

  .commentInfo {
    /* border: 1px solid black; */
    display: inline-flex;
    align-items: center;
    gap: 15px;
    padding-bottom: 13px;
    height: 50px;
    min-width: 20%; /* 최소 너비 */
    max-width: 80%; /* 최대 너비 */
  }
  .commentInfo img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  }

  .infoWrap * {
    margin: 0;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  }
  .infoWrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 5px;
  }
  .infoWrap .job {
    color: rgba(from ${({ theme }) => theme.COLORS.MAIN_GREEN2} r g b / 0.8);
  }

  .textBox {
    border: 1.5px solid transparent;
    min-height: 6rem;
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
    resize: none;
  }
  .textBox:focus {
    outline: 2px solid ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  }

  .writeTime {
    color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
    text-align: end;
    transform: translate(-0.5rem, -1.3rem);
  }

  .btnWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    min-width: 4rem;

    position: absolute;
    right: 0;
    top: 1rem;
  }

  .editBtn,
  .closeBtn {
    padding: 3px;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    cursor: pointer;
  }
  .editBtn {
    padding-top: 8px;
    filter: invert(82%) sepia(8%) saturate(523%) hue-rotate(41deg) brightness(87%) contrast(86%);
  }
  .closeBtn {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  }
  .editBtn:hover,
  .closeBtn:hover {
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
    filter: none;
  }

  .btnInnerWrap {
    padding-top: 5px;
  }
  .saveBtn,
  .cancelBtn {
    text-align: center;
    padding: 3px;
    margin: 0 10px;
    width: 3rem;
    cursor: pointer;
  }
  .saveBtn:hover,
  .cancelBtn:hover {
    color: ${({ theme }) => theme.COLORS.LIGHTGREEN_SUB};
  }
`;
