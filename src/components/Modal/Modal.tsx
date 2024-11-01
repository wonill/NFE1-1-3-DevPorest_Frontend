import React from "react";
import {
  Overlay,
  ModalContainer,
  Message,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
} from "./Modal.style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <Message>{message}</Message>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
