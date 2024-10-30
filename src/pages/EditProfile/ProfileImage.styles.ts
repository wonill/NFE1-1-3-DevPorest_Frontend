import styled from "@emotion/styled";

export const ProfileImageWrapper = styled.div`
  width: 250px;
  height: 250px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  }

  input {
    display: none;
  }
`;

export const PencilImage = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.PADDINGS.X_SMALL};
  bottom: ${({ theme }) => theme.PADDINGS.X_SMALL};
  width: 50px;
  background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
  cursor: pointer;

  img {
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
  }
`;

export const SetProfileModal = styled.div`
  position: absolute;
  top: 13rem;
  right: -7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  padding: 0 ${({ theme }) => theme.PADDINGS.X_SMALL};
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};

  button {
    width: 115px;
    border: none;
    outline: none;
    background-color: transparent;
    padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
    font-size: ${({ theme }) => theme.FONT_SIZE.TAG};
    cursor: pointer;
  }

  button:nth-of-type(2) {
    border-top: 1px solid ${({ theme }) => theme.COLORS.MAIN_GRAY};
  }
`;
