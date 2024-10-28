import styled from "@emotion/styled";

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};

  > p:first-of-type {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  }
`;
export const FooterText = styled.p`
  > strong {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export const FooterLogo = styled.div`
  display: flex;
  align-items: center;

  > img {
    scale: 0.7;
  }

  > p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICKER};
    font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
  }
  > p:first-of-type {
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }
  > p:last-of-type {
    color: #3e5617;
  }
`;
