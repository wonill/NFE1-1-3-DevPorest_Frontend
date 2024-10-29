import { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { DropBtn } from "./Dropdown.styles";
import { TechStackType } from "../../data/profilePageData";
import { Job } from "../../types/job";

interface DropDownProps {
  name?: string;
  items: TechStackType[] | Job[];
  placeholder: string;
}

const DropDown: React.FC<DropDownProps> = ({ name, items, placeholder }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [DropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const DropdownBtnRef = useRef<HTMLButtonElement>(null);

  const handleDropdownClick = () => {
    if (DropdownBtnRef.current) {
      const rect = DropdownBtnRef.current.getBoundingClientRect();
      setDropdownPosition({ x: rect.left, y: rect.bottom });
    }
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div>
      <DropBtn ref={DropdownBtnRef} onClick={handleDropdownClick}>
        {name}
      </DropBtn>

      {isDropdownOpen && (
        <Dropdown
          isOpen={isDropdownOpen}
          items={items}
          position={{ x: DropdownPosition.x, y: DropdownPosition.y + 10 }}
          placeholder={placeholder}
          onSelect={(item) => console.log(item.name)}
        />
      )}
    </div>
  );
};
export default DropDown;
