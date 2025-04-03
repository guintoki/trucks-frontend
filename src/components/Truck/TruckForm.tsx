import React, { useState } from "react";
import styled from "styled-components";
import { LicenseType } from "../../types/LicenseType";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
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

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
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

interface TruckFormProps {
  onSubmit: (plate: string, min_license_type: LicenseType) => void;
}

const TruckForm: React.FC<TruckFormProps> = ({ onSubmit }) => {
  const [plate, setPlate] = useState("");
  const [min_license_type, setMinLicenseType] = useState<LicenseType>("A");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plate, min_license_type);
    setPlate("");
    setMinLicenseType("A");
  };

  return (
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

      <Button type="submit" disabled={!plate}>
        Adicionar Caminhão
      </Button>
    </Form>
  );
};

export default TruckForm;
