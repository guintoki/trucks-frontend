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

interface Truck {
  id: number;
  plate: string;
  min_license_type: string;
}

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
  const initialPlate = truck ? truck.plate : "";
  const initialmin_license_type = truck ? truck.min_license_type : "";

  const [plate, setPlate] = useState(initialPlate);
  const [min_license_type, setmin_license_type] = useState(
    initialmin_license_type
  );

  useEffect(() => {
    if (truck) {
      setPlate(truck.plate);
      setmin_license_type(truck.min_license_type);
    }
  }, [truck]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plate, min_license_type as LicenseType);
  };

  return (
    <Modal
      style={modalCustomStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Edit Truck</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="editPlate">Plate:</Label>
        <Input
          id="editPlate"
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="Plate"
          required
        />
        <Label htmlFor="editmin_license_type">Min License Type:</Label>
        <Select
          id="editmin_license_type"
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
        <Button type="submit">Update Truck</Button>
      </Form>
    </Modal>
  );
};

export default EditTruckModal;
