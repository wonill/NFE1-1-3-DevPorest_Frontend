import React, { useState } from "react";
import { ITechStackType } from "./../../types/api-types/TechStackType";
import { Button } from "./TechStack2.styles";

interface TechStack2Props {
  content: Omit<ITechStackType, "textColor">;
  onClick: () => void;
}

const TechStack2: React.FC<TechStack2Props> = ({ content, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <Button onClick={handleClick} color={content.bgColor} isActive={isActive}>
      <div></div>
      <p>{content.skill}</p>
    </Button>
  );
};

export default TechStack2;
