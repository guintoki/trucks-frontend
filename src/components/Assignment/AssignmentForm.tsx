import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Truck } from "../../types/Truck";
import { Assignment } from "../../types/Assignment";
import { Driver } from "../../types/Driver";
import { createAssignment } from "../../utils/api";

const Form = styled.form`
  margin: 20px auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  margin: 10px;
  padding: 10px;
  width: 80%;
`;

const Input = styled.input`
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

interface AssignmentFormProps {
  drivers: Driver[];
  trucks: Truck[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (assignment: Assignment) => void;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({
  drivers,
  trucks,
  setAssignments,
  setError,
  setSuccess,
  setLoading,
  onSubmit,
}) => {
  const [driverId, setDriverId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [date, setDate] = useState("");
  const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    if (driverId) {
      const selectedDriver = drivers.find(
        (driver) => driver.id.toString() === driverId
      );
      if (selectedDriver) {
        const availableTrucks = trucks.filter(
          (truck) => truck.min_license_type <= selectedDriver.license_type
        );
        setFilteredTrucks(availableTrucks);
      }
    }
  }, [driverId, drivers, trucks]);

  const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDriverId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newAssignment = {
        driver_id: driverId,
        truck_id: truckId,
        date,
      };
      const createdAssignment = await createAssignment(newAssignment);
      if (createdAssignment.error) {
        setError(createdAssignment.error);
        setLoading(false);
        return;
      }
      onSubmit(createdAssignment);
      setDriverId("");
      setTruckId("");
      setDate("");
      setSuccess("Assignment created successfully.");
    } catch (err) {
      setError("Failed to create assignment.");
    }
    setLoading(false);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="assignment-form">
      <Label htmlFor="driver">Driver:</Label>
      <Select
        id="driver"
        value={driverId}
        onChange={handleDriverChange}
        required
      >
        <option value="">Select a driver</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.name}
          </option>
        ))}
      </Select>
      <Label htmlFor="truck">Truck:</Label>
      <Select
        id="truck"
        value={truckId}
        onChange={(e) => setTruckId(e.target.value)}
        required
      >
        <option value="">Select a truck</option>
        {filteredTrucks.map((truck) => (
          <option key={truck.id} value={truck.id}>
            {truck.plate}
          </option>
        ))}
      </Select>
      <Label htmlFor="date">Date:</Label>
      <Input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={getMinDate()}
        required
      />
      <Button type="submit">Add Assignment</Button>
    </Form>
  );
};

export default AssignmentForm;
