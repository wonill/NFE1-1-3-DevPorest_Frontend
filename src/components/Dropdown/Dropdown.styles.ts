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
