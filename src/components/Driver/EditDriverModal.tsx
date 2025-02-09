import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { LicenseType } from "../../types/LicenseType";

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

const Form = styled.form`
  margin: 20px auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 80%;
`;

const Select = styled.select`
  margin: 10px;
  padding: 10px;
  width: 80%;
`;

const Label = styled.label`
  width: 80%;
  text-align: left;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #e53935;
  }
`;

interface EditDriverModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (name: string, license_type: LicenseType) => void;
  initialName: string;
  initialLicenseType: LicenseType;
}

const EditDriverModal: React.FC<EditDriverModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  initialName,
  initialLicenseType,
}) => {
  const [name, setName] = useState(initialName);
  const [license_type, setLicenseType] = useState(initialLicenseType);

  useEffect(() => {
    setName(initialName);
    setLicenseType(initialLicenseType);
  }, [initialName, initialLicenseType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, license_type);
  };

  return (
    <Modal
      style={modalCustomStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Edit Driver</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="editName">New Name:</Label>
        <Input
          id="editName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <Label htmlFor="editLicenseType">License Type:</Label>
        <Select
          id="editLicenseType"
          value={license_type}
          onChange={(e) => setLicenseType(e.target.value as LicenseType)}
          required
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </Select>
        <div>
          <Button type="submit">Update Driver</Button>
          <CancelButton type="button" onClick={onRequestClose}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Modal>
  );
};

export default EditDriverModal;
