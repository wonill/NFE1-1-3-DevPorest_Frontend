import styled from "@emotion/styled";

export const CommentBoxWrapper = styled.div`
  & {
    /* border: 2px solid black; */
    position: relative;
    padding: ${({ theme }) => theme.PADDINGS.SMALL};
    font-size: ${({ theme }) => theme.FONT_SIZE.DESCRIPTION};

    margin: 0;
    box-sizing: border-box;
  }

  .commentInfo {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-bottom: 13px;
  }
  .commentInfo img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    margin-left: 10px;
  }

  .infoWrap * {
    margin: 0;
  }
  .infoWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .textBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
    padding: 0 ${({ theme }) => theme.PADDINGS.X_SMALL};
    min-height: 6rem;
  }
  .textBox .writeTime {
    color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
    text-align: end;
  }

  .closeBtn {
    color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
    position: absolute;
    right: 2.5rem;
    top: 1.5rem;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;
