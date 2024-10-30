import styled from "@emotion/styled";

export const ThumbnailInputWrapper = styled.div`
  position: relative;
  label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  img {
    width: 1.5rem;
    object-fit: cover;
  }
  input[type="file"] {
    display: none;
  }
  .deleteBtn {
    width: 1rem;
    height: 1rem;
    line-height: 0.8rem;
    text-align: center;
    padding: 0;

    border: none;
    background-color: rgba(
      from ${({ theme }) => theme.COLORS.MAIN_GRAY} r g b / 0.5
    );
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
    color: ${({ theme }) => theme.COLORS.MAIN_BG};
    position: absolute;
    right: -25px;
    top: 3px;

    cursor: pointer;
  }
`;
