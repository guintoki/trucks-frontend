import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { LicenseType } from "../../types/LicenseType";
import { Truck } from "../../types/Truck";

const ModalContent = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
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

const SaveButton = styled(Button)`
  background-color: #3498db;
  color: white;
  border: none;

  &:hover {
    background-color: #2980b9;
  }
`;

interface EditTruckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (plate: string, min_license_type: LicenseType) => void;
  truck: Truck | null;
}

const EditTruckModal: React.FC<EditTruckModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  truck,
}) => {
  const [plate, setPlate] = useState("");
  const [min_license_type, setMinLicenseType] = useState<LicenseType>("B");

  useEffect(() => {
    if (truck) {
      setPlate(truck.plate);
      setMinLicenseType(truck.min_license_type);
    }
  }, [truck]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plate, min_license_type);
  };

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
        <Title>Editar Caminhão</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="plate">Placa</Label>
            <Input
              id="plate"
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="ABC1234"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="min_license_type">Tipo de CNH Mínimo</Label>
            <Select
              id="min_license_type"
              value={min_license_type}
              onChange={(e) => setMinLicenseType(e.target.value as LicenseType)}
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onRequestClose}>
              Cancelar
            </CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default EditTruckModal;
