import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(235, 235, 235, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  min-height: 190px;
  background-color: white;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 2rem;
`;

export const Message = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export const CancelButton = styled.button`
  cursor: pointer;
  border: solid 2px ${({ theme }) => theme.COLORS.MAIN_GREEN};
  background-color: ${({ theme }) => theme.COLORS.MAIN_BG};
  color: ${({ theme }) => theme.COLORS.MAIN_GREEN};
  width: 90px;
  height: 50px;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
`;

export const ConfirmButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.COLORS.MAIN_GREEN};
  color: white;
  color: white;
  width: 90px;
  height: 50px;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
`;
