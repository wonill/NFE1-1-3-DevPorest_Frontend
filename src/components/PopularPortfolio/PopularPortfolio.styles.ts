import styled from "@emotion/styled";

export const PopularPortfolioContainer = styled.div`
  width: 30%;
  height: 320px;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 25%, rgba(0, 0, 0, 0) 50%);

    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT}; /* 모서리 둥글게 */
  }
`;

export const InfoWrapper = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.PADDINGS.MEDIUM};
  bottom: ${({ theme }) => theme.PADDINGS.MEDIUM};
  color: ${({ theme }) => theme.COLORS.MAIN_BG};
  z-index: 100;

  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  }

  p:nth-of-type(1) {
    font-size: ${({ theme }) => theme.FONT_SIZE.HEADING3};
    margin-bottom: ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 2)`};
  }
`;
