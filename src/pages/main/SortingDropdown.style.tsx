import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  width: fit-content;
  display: flex;
  p {
    cursor: pointer;
    align-self: center;

    display: block;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.25px;
    color: rgb(124, 132, 132);
    margin-right: 8px;
  }
`;

export const DropdownButton = styled.div`
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -0.25px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  color: rgb(22, 28, 28);
  width: fit-content;
  cursor: pointer;
`;

export const DropdownList = styled.ul`
  position: absolute;
  z-index: 100;
  padding: 8px;
  background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
  border: 1px solid rgb(240, 245, 245);
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px 0px;
  list-style-type: none;
  left: -2px;
  top: 130%;

  width: fit-content;
`;

export const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 12px 16px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.25px;
  color: rgb(22, 28, 28);
  border-radius: 8px;
  background: ${({ isSelected }) =>
    isSelected ? "rgb(247, 249, 249)" : "white"};
  padding: 12px 16px;
  text-align: start;
  word-break: keep-all;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(247, 249, 249);
  }
`;

export const DropdownArrow = styled.div<{ isOpen: boolean }>`
  margin-left: 6px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;
