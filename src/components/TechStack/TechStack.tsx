/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from './TechStack.styles';

export interface TechStackType {
  name: string;
  backgroundColor: string;
  color: string;
  onClick: () => void;
}

const TechStack: React.FC<TechStackType> = ({ name, backgroundColor, color, onClick }) => {
  return (
    <Button backgroundColor={backgroundColor} color={color} onClick={onClick}>
      {name}
    </Button>
  );
};

export default TechStack;
