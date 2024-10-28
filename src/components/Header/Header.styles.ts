import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
  & {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px ${({ theme }) => theme.PADDINGS.SMALL};
    box-shadow: 0 1px 0.5px -0.5px rgba(0, 0, 0, 0.25);
  }

  .logo {
    line-height: 3rem;
    display: flex;
    gap: 5px;
    cursor: pointer;
  }
  .logo img {
    object-fit: contain;
  }

  .wrap {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .wrap .searchBar {
    line-height: 1rem;
    width: 15rem;
    padding: 10px calc(${({ theme }) => theme.PADDINGS.X_SMALL});
    padding-left: 2.5rem;
    margin-right: 5px;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
    border: 0.5px solid
      rgb(from ${({ theme }) => theme.COLORS.MAIN_GRAY} r g b / 0.5);
    background-color: rgb(
      from ${({ theme }) => theme.COLORS.MAIN_GRAY} r g b / 0.15
    );
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }
  .wrap ::placeholder {
    color: rgb(from ${({ theme }) => theme.COLORS.MAIN_BLACK} r g b / 0.5);
  }
  .wrap .searchBar:focus {
    outline: transparent;
  }

  .wrap .searchIcon {
    position: absolute;
    left: 8px;
    width: 1.5rem;
  }
`;
