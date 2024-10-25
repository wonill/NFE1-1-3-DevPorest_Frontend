import { ButtonWrapper } from "./Button.styles";

interface ButtonProps {
  text: string;
  colorType: number;
  isDisabled: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  colorType,
  isDisabled,
  onClick,
}) => {
  return (
    <ButtonWrapper colorType={colorType} onClick={onClick}>
      <button className={`btn ${isDisabled ? "disabled" : "active"}`}>
        {text}
      </button>
    </ButtonWrapper>
  );
};

export default Button;
