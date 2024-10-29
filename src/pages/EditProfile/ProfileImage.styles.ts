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
