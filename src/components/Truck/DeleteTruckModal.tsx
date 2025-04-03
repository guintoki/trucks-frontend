import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";
import { Truck } from "../../types/Truck";

const ModalContent = styled.div`
  padding: 2rem;
  text-align: center;
`;

const WarningIcon = styled(FaExclamationTriangle)`
  color: #e74c3c;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f1f1f1;
  color: #666;
  border: 1px solid #ddd;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  border: none;

  &:hover {
    background-color: #c0392b;
  }
`;

interface DeleteTruckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  truck: Truck | null;
}

const DeleteTruckModal: React.FC<DeleteTruckModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  truck,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "500px",
          width: "90%",
          borderRadius: "8px",
          border: "none",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <ModalContent>
        <WarningIcon />
        <Title>Excluir Caminhão</Title>
        <Message>
          Tem certeza que deseja excluir o caminhão com placa{" "}
          <strong>{truck?.plate}</strong>? Esta ação não pode ser desfeita.
        </Message>
        <ButtonGroup>
          <CancelButton onClick={onRequestClose}>Cancelar</CancelButton>
          <DeleteButton onClick={onConfirm}>Excluir</DeleteButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTruckModal;
