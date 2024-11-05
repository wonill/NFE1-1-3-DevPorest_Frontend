import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
  & {
    position: relative;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px ${({ theme }) => theme.PADDINGS.SMALL};
    box-shadow: 0 1px 0.5px -0.5px rgba(0, 0, 0, 0.25);
  }

  .wrap {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .btnWrap {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  @media (min-width: 900px) {
    .md-hidden {
      display: none;
    }
  }

  @media (max-width: 900px) {
    .md-flex {
      display: none;
    }
    .searchIcon.md-hidden {
      width: 1.5rem;
      margin: 0 15px;
      cursor: pointer;
    }
  }

  .searchModal {
    /* border: 3px solid black; */
    background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
    width: 50vw;
    height: 3.5rem;
    position: absolute;
    top: 3.5rem;
    right: 0.5rem;

    display: flex;
    justify-content: end;
    /* align-items: start; */
    transition: 1s;
  }
  .searchModal.hidden {
    height: 0;
    overflow: hidden;
    opacity: 0%;
    transition: 1s;
  }

  .profileImg {
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    width: 2.3rem;
    height: 2.3rem;
    cursor: pointer;
  }
`;

export const SearchBarWrapper = styled.div`
  & {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .searchBar {
    line-height: 1rem;
    width: 15rem;
    padding: 10px calc(${({ theme }) => theme.PADDINGS.X_SMALL});
    padding-left: 2.5rem;
    margin-right: 5px;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
    border: 0.5px solid rgb(from ${({ theme }) => theme.COLORS.MAIN_GRAY} r g b / 0.5);
    background-color: rgb(from ${({ theme }) => theme.COLORS.MAIN_GRAY} r g b / 0.15);
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }
  ::placeholder {
    color: rgb(from ${({ theme }) => theme.COLORS.MAIN_BLACK} r g b / 0.5);
  }
  .searchBar:focus {
    outline: transparent;
  }
  .searchIcon {
    width: 1.5rem;
    position: absolute;
    left: 8px;
    margin: 0;
  }
  .searchIcon.md-hidden {
    margin: 0;
  }
`;
