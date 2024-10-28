import styled from "@emotion/styled";

interface LogoWrapperProps {
  scale: number;
}

export const LogoWrapper = styled.i<LogoWrapperProps>`
  & {
    display: flex;
    align-items: center;
    gap: calc(5px * ${({ scale }) => scale});
    cursor: pointer;
  }
  img {
    object-fit: contain;
  }
  img:nth-of-type(1) {
    height: calc(2rem * ${({ scale }) => scale});
  }
  img:nth-of-type(2) {
    height: calc(1rem * ${({ scale }) => scale});
  }
`;
