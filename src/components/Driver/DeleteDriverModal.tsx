import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";

const ModalStyles = {
  content: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const ModalContent = styled.div`
  text-align: center;
`;

const WarningIcon = styled(FaExclamationTriangle)`
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ModalMessage = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const DriverName = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &.primary {
    background-color: #e74c3c;
    color: white;

    &:hover {
      background-color: #c0392b;
    }
  }

  &.secondary {
    background-color: #e2e8f0;
    color: #2c3e50;

    &:hover {
      background-color: #cbd5e0;
    }
  }
`;

interface DeleteDriverModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  driverName: string;
}

const DeleteDriverModal: React.FC<DeleteDriverModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  driverName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyles}
      ariaHideApp={false}
    >
      <ModalContent>
        <WarningIcon />
        <ModalTitle>Confirmar Exclusão</ModalTitle>
        <ModalMessage>
          Tem certeza que deseja excluir o motorista{" "}
          <DriverName>{driverName}</DriverName>? Esta ação não pode ser
          desfeita.
        </ModalMessage>
        <ButtonGroup>
          <Button type="button" className="secondary" onClick={onRequestClose}>
            Cancelar
          </Button>
          <Button type="button" className="primary" onClick={onConfirm}>
            Excluir
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

export default DeleteDriverModal;
