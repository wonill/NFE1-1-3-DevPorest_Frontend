import React from "react";
import { ITechStackType } from "./../../types/api-types/TechStackType";
import { Button } from "./TechStack2.styles";

interface TechStack2Props {
  content: Omit<ITechStackType, "textColor">;
  isActive: boolean;
  onClick: () => void;
}

const TechStack2: React.FC<TechStack2Props> = ({ content, isActive, onClick }) => {
  return (
    <Button onClick={onClick} color={content.bgColor} isActive={isActive}>
      <div></div>
      <p>{content.skill}</p>
    </Button>
  );
};

export default TechStack2;
