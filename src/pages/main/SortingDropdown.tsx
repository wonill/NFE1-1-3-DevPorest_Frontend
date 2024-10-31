// src/components/Dropdown/Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
  DropdownArrow,
} from "./SortingDropdown.style";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  selectedSortOption: string;
}

const SortingDropdown: React.FC<DropdownProps> = ({ options, onSelect, selectedSortOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={toggleRef} onClick={handleToggle}>
      <p>정렬 방식</p>
      <DropdownButton>{selectedSortOption}</DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={() => handleSelect(option)}
              isSelected={selectedSortOption === option}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
      <DropdownArrow isOpen={isOpen}>
        <img src="/dropdown_arrow.svg" alt="드롭다운" />
      </DropdownArrow>
    </DropdownContainer>
  );
};

export default SortingDropdown;
