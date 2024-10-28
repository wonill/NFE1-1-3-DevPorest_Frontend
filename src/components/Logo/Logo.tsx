import { LogoWrapper } from "./Logo.styles";

interface LogoProps {
  scale: number;
}

const Logo: React.FC<LogoProps> = ({ scale }) => {
  return (
    <LogoWrapper scale={scale}>
      <img src="/tree-logo.svg" alt="tree" />
      <img src="/devporest-logo.svg" alt="logo" />
    </LogoWrapper>
  );
};
export default Logo;
