/** @jsxImportSource @emotion/react */
import React from "react";
import { Button } from "./TechStack.styles";
import { ITechStackType } from "../../types/api-types/TechStackType";

export interface TechStackProps {
  content: ITechStackType;
  onClick: () => void;
}

const TechStack: React.FC<TechStackProps> = ({ content, onClick }) => {
  return (
    <Button backgroundColor={content.bgColor} color={content.textColor} onClick={onClick}>
      {content.skill}
    </Button>
  );
};

export default TechStack;
