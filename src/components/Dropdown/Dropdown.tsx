import React, { useEffect, useRef, useState } from "react";
import { TechStackType } from "../TechStack/TechStack";
import { Job } from "../../types/job";
import { DropdownContainer, Input, Ul, Li, InputWrapper } from "./Dropdown.styles";

/**
 * todo
 * - 전역 상태 관리로 데이터 관리
 */

export interface DropdownType {
  isOpen: boolean;
  items: TechStackType[] | Job[];
  position: { x: number; y: number };
  placeholder: string;
  onSelect: (item: TechStackType | Job) => void;
}

const Dropdown: React.FC<DropdownType> = ({ isOpen, items, position, placeholder, onSelect }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

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
          <Li key={item.name} onClick={() => onSelect(item)}>
            {item.name}
          </Li>
        ))}
      </Ul>
    </DropdownContainer>
  );
};

export default Dropdown;
