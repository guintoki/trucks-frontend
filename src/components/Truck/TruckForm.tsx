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

interface TruckFormProps {
  onSubmit: (plate: string, min_license_type: LicenseType) => void;
}

const TruckForm: React.FC<TruckFormProps> = ({ onSubmit }) => {
  const [plate, setPlate] = useState("");
  const [min_license_type, setmin_license_type] = useState("A");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plate, min_license_type as LicenseType);
    setPlate("");
    setmin_license_type("A");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="plate">Plate:</Label>
      <Input
        id="plate"
        type="text"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        placeholder="Plate"
        required
      />
      <Label htmlFor="min_license_type">Min License Type:</Label>
      <Select
        id="min_license_type"
        value={min_license_type}
        onChange={(e) => setmin_license_type(e.target.value)}
        required
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
      </Select>
      <Button type="submit">Create Truck</Button>
    </Form>
  );
};

export default TruckForm;
