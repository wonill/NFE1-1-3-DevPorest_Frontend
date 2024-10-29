import styled from "@emotion/styled";

export const GithubLoginBtnStylesWrapper = styled.div`
  & {
    width: 65%;
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    background-color: black;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    cursor: pointer;
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
    object-fit: contain;
    filter: invert(1);
  }
  i {
    color: white;
    font-size: ${({ theme }) => theme.FONT_SIZE.HEADING3};
  }
`;
