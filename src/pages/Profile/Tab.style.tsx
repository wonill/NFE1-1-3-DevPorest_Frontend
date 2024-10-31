import styled from "@emotion/styled";

export const TabContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;

  @media (min-width: 768px) {
    margin-top: 4rem;
  }
`;

export const Tab = styled.div<{ active: boolean }>`
  position: relative;
  padding: 10px;
  color: ${({ active, theme }) =>
    active ? theme.COLORS.MAIN_GREEN : theme.COLORS.MAIN_BLACK};
  cursor: pointer;
  transition: background-color 0.3s;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background-color: ${({ theme, active }) =>
      active ? theme.COLORS.MAIN_GREEN : "transparent"};
    transition: transform 0.3s ease;
    transform: ${({ active }) => (active ? "scaleX(1)" : "scaleX(0)")};
    transform-origin: center;
  }
`;
