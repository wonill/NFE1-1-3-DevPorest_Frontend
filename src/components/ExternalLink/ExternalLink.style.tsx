import styled from "@emotion/styled";

interface StyledExternalLinkProp {
  hasLink: boolean;
}

export const StyledExternalLink = styled.a<StyledExternalLinkProp>`
  cursor: ${(prop) => (prop.hasLink ? "pointer" : "default")};

  ${(prop) =>
    !prop.hasLink &&
    `
        pointer-events: none;   
    `}
`;
