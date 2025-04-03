import React, { useState } from "react";
import styled from "styled-components";
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

interface DriverFormProps {
  onSubmit: (name: string, license_type: LicenseType) => void;
}

const DriverForm: React.FC<DriverFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [license_type, setLicenseType] = useState<LicenseType>("A");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, license_type);
    setName("");
    setLicenseType("A");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Nome do Motorista</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Digite o nome do motorista"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="license_type">Tipo de Carteira</Label>
        <Select
          id="license_type"
          value={license_type}
          onChange={(e) => setLicenseType(e.target.value as LicenseType)}
          required
          data-testid="licenseType"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </Select>
      </FormGroup>

      <Button type="submit" disabled={!name.trim()}>
        Adicionar Motorista
      </Button>
    </Form>
  );
};

export default DriverForm;
