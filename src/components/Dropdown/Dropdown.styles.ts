import styled from "@emotion/styled";
import { DropdownType } from "./Dropdown";

export const DropdownContainer = styled.div<Pick<DropdownType, "position">>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 240px;
  background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  position: absolute;
  left: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
  z-index: 100;
`;

export const InputWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 2)`};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  border: 1px solid ${({ theme }) => theme.COLORS.MAIN_GRAY};
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};

  &:focus {
    outline: 3px solid ${({ theme }) => theme.COLORS.MAIN_GREEN};
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 ${({ theme }) => theme.PADDINGS.X_SMALL};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  }
`;

export const Li = styled.li`
  color: ${({ theme }) => theme.COLORS.MAIN_GREEN2};
  padding: ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 2)`};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  }
`;

export const DropBtn = styled.button`
  width: 95px;
  height: 42px;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  border: none;
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
  padding-right: ${({ theme }) => theme.PADDINGS.MEDIUM};
  cursor: pointer;
  position: relative;

  color: ${({ theme }) => theme.COLORS.MAIN_GREEN2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }
`;
