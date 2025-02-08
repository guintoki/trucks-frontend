import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const modalCustomStyles = {
  content: {
    width: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 2px solid #4caf50;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #45a049;
    color: white;
  }
`;

const ConfirmDeleteButton = styled(Button)`
  background-color: #ff4d4d;
  color: white;
  border: none;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const ActionsButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 20px;
`;

interface DeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onDelete: () => void;
  itemType: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onRequestClose,
  onDelete,
  itemType,
}) => {
  return (
    <Modal
      style={modalCustomStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <DeleteModalContent>
        <h2>Are you sure you want to delete this {itemType}?</h2>
        <ActionsButtons>
          <Button onClick={onRequestClose}>No</Button>
          <ConfirmDeleteButton onClick={onDelete}>Yes</ConfirmDeleteButton>
        </ActionsButtons>
      </DeleteModalContent>
    </Modal>
  );
};

export default DeleteModal;
