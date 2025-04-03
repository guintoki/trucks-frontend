import React, { useState } from "react";
import styled from "styled-components";
import { Assignment } from "../../types/Assignment";
import { LicenseType } from "../../types/LicenseType";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
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

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
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

interface AssignmentFormProps {
  drivers: Driver[];
  trucks: Truck[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (assignment: Assignment) => void;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({
  drivers,
  trucks,
  onSubmit,
}) => {
  const [driverId, setDriverId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDriver = drivers.find(
      (driver) => driver.id === Number(driverId)
    );
    const selectedTruck = trucks.find((truck) => truck.id === Number(truckId));

    if (!selectedDriver || !selectedTruck) {
      return;
    }

    const newAssignment: Assignment = {
      id: Date.now(),
      driver: selectedDriver,
      truck: selectedTruck,
      date,
    };

    onSubmit(newAssignment);
    setDriverId("");
    setTruckId("");
    setDate("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="driver">Motorista</Label>
        <Select
          id="driver"
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
        <Label htmlFor="truck">Caminhão</Label>
        <Select
          id="truck"
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
        <Label htmlFor="date">Data</Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </FormGroup>

      <Button type="submit" disabled={!driverId || !truckId || !date}>
        Adicionar Atribuição
      </Button>
    </Form>
  );
};

export default AssignmentForm;
