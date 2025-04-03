import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { LicenseType } from "../../types/LicenseType";

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

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
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
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
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
  const [license_type, setLicenseType] =
    useState<LicenseType>(initialLicenseType);

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
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyles}
      ariaHideApp={false}
    >
      <ModalTitle>Editar Motorista</ModalTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="editName">Nome do Motorista</Label>
          <Input
            type="text"
            id="editName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Digite o nome do motorista"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="editLicenseType">Tipo de Carteira</Label>
          <Select
            id="editLicenseType"
            value={license_type}
            onChange={(e) => setLicenseType(e.target.value as LicenseType)}
            required
            data-testid="editLicenseType"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button type="button" className="secondary" onClick={onRequestClose}>
            Cancelar
          </Button>
          <Button type="submit" className="primary" disabled={!name.trim()}>
            Salvar Alterações
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default EditDriverModal;
