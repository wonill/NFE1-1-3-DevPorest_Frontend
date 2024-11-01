import React, { useEffect, useRef, useState } from "react";
import { Job } from "../../types/job";
import { DropdownContainer, Input, Ul, Li, InputWrapper } from "./Dropdown.styles";
import { ITechStackType } from "../../types/api-types/TechStackType";

export interface DropdownType {
  isOpen: boolean;
  items: ITechStackType[] | Job[];
  position: { x: number; y: number };
  placeholder: string;
  onSelect: (item: ITechStackType | Job) => void;
}

const Dropdown: React.FC<DropdownType> = ({ isOpen, items, position, placeholder, onSelect }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const filteredItems = items.filter(item => {
    if ("skill" in item) {
      return item.skill.toLowerCase().includes(inputValue.toLowerCase());
    }
    if ("name" in item) {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    }
  });

  return (
    <DropdownContainer position={position}>
      <InputWrapper>
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={placeholder}
        />
      </InputWrapper>
      <Ul>
        {filteredItems.map(item => (
          <Li key={"skill" in item ? item.skill : item.name} onClick={() => onSelect(item)}>
            {"skill" in item ? item.skill : item.name}
          </Li>
        ))}
      </Ul>
    </DropdownContainer>
  );
};

export default Dropdown;
