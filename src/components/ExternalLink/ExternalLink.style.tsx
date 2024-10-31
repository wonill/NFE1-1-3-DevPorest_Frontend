import styled from "@emotion/styled";

interface StyledExternalLinkProp {
  hasLink: boolean;
}

export const StyledExternalLink = styled.a<StyledExternalLinkProp>`
  cursor: ${prop => (prop.hasLink ? "pointer" : "default")};

  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }

  ${prop =>
    !prop.hasLink &&
    `
        pointer-events: none;   
    `}
`;
