import { StyledFooter, FooterText, FooterLogo } from "./Footer.style";

const Footer = () => {
  return (
    <StyledFooter>
      <p>Dev Porest</p>
      <FooterText>
        ⓒ <strong>2024 STUNNING INC.</strong>
      </FooterText>
      <FooterLogo>
        <img src="/src/assets/footer_logo.svg" alt="로고" />
        <p>DEV</p>
        <p>POREST</p>
      </FooterLogo>
    </StyledFooter>
  );
};

export default Footer;
