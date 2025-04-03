import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { Assignment } from "../../types/Assignment";
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

interface Driver {
  id: number;
  name: string;
  license_type: LicenseType;
}

interface Truck {
  id: number;
  plate: string;
  min_license_type: LicenseType;
}

interface EditAssignmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (assignment: Assignment) => void;
  drivers: Driver[];
  trucks: Truck[];
  assignment: Assignment | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  drivers,
  trucks,
  assignment,
  setError,
  setLoading,
}) => {
  const [driverId, setDriverId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (assignment) {
      setDriverId(assignment.driver.id.toString());
      setTruckId(assignment.truck.id.toString());
      setDate(assignment.date);
    }
  }, [assignment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDriver = drivers.find(
      (driver) => driver.id === Number(driverId)
    );
    const selectedTruck = trucks.find((truck) => truck.id === Number(truckId));

    if (!selectedDriver || !selectedTruck || !assignment) {
      return;
    }

    const updatedAssignment: Assignment = {
      ...assignment,
      driver: selectedDriver,
      truck: selectedTruck,
      date,
    };

    onSubmit(updatedAssignment);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyles}
      ariaHideApp={false}
    >
      <ModalTitle>Editar Atribuição</ModalTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="editDriver">Motorista</Label>
          <Select
            id="editDriver"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            required
          >
            <option value="">Selecione um motorista</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} - Carteira {driver.license_type}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="editTruck">Caminhão</Label>
          <Select
            id="editTruck"
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
            required
          >
            <option value="">Selecione um caminhão</option>
            {trucks.map((truck) => (
              <option key={truck.id} value={truck.id}>
                {truck.plate} - Carteira mínima {truck.min_license_type}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="editDate">Data</Label>
          <Input
            type="date"
            id="editDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="button" className="secondary" onClick={onRequestClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="primary"
            disabled={!driverId || !truckId || !date}
          >
            Salvar Alterações
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default EditAssignmentModal;
