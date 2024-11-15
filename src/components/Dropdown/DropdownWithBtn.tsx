import { useRef, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { DropBtn } from "./Dropdown.styles";
import { TechStackType } from "../../data/profilePageData";
import { Job } from "../../types/job";

interface DropDownWithBtnProps {
  name?: string;
  items: TechStackType[] | Job[];
  placeholder: string;
}

const DropDownWithBtn: React.FC<DropDownWithBtnProps> = ({
  name,
  items,
  placeholder,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [DropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const DropdownBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 버튼과 드롭다운 영역 외부 클릭 시 드롭다운 닫기
      if (
        isDropdownOpen &&
        DropdownBtnRef.current &&
        dropdownRef.current &&
        !DropdownBtnRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
        <div ref={dropdownRef}>
          <Dropdown
            isOpen={isDropdownOpen}
            items={items}
            position={{ x: DropdownPosition.x, y: DropdownPosition.y + 10 }}
            placeholder={placeholder}
            onSelect={(item) => {
              console.log(item.name);
              setIsDropdownOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default DropDownWithBtn;
