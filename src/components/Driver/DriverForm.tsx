import React, { useState } from "react";
import styled from "styled-components";
import { LicenseType } from "../../types/LicenseType";

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
      <Label htmlFor="name">Name:</Label>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <Label htmlFor="license_type">License Type:</Label>
      <Select
        id="license_type"
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
      <Button type="submit">Save Driver</Button>
    </Form>
  );
};

export default DriverForm;
