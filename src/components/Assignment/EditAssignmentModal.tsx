import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { Assignment } from "../../types/Assignment";
import { Driver } from "../../types/Driver";
import { Truck } from "../../types/Truck";
import { updateAssignment } from "../../utils/api";

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

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #e53935;
  }
`;

interface EditAssignmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (assignment: Assignment) => void;
  drivers: Driver[];
  trucks: Truck[];
  assignment: Assignment | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
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
  setSuccess,
  setLoading,
}) => {
  const [driverId, setDriverId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [date, setDate] = useState("");
  const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    if (assignment) {
      setDriverId(assignment.driver.id.toString());
      setTruckId(assignment.truck.id.toString());
      setDate(assignment.date);
    }
  }, [assignment]);

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
    if (assignment) {
      setLoading(true);
      try {
        const updatedAssignment = {
          ...assignment,
          driver: drivers.find((driver) => driver.id === Number(driverId))!,
          truck: trucks.find((truck) => truck.id === Number(truckId))!,
          driver_id: driverId,
          truck_id: truckId,
          date,
        };
        const updatedAssignmentResponse = await updateAssignment(
          updatedAssignment.id,
          updatedAssignment
        );
        if (updatedAssignmentResponse.error) {
          setError(updatedAssignmentResponse.error);
          setLoading(false);
          return;
        }
        onSubmit(updatedAssignment);
        setSuccess("Assignment updated successfully.");
      } catch (err) {
        setError("Failed to update assignment.");
      }
      setLoading(false);
      onRequestClose();
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <Modal
      style={modalCustomStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Edit Assignment</h2>
      <Form onSubmit={handleSubmit} data-testid="edit-assignment-form">
        <Label htmlFor="editDriver">New Driver:</Label>
        <Select
          id="editDriver"
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
        <Label htmlFor="editTruck">New Truck:</Label>
        <Select
          id="editTruck"
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
        <Label htmlFor="editDate">New Date:</Label>
        <Input
          id="editDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={getMinDate()}
          required
        />
        <div>
          <Button type="submit">Update</Button>
          <CancelButton type="button" onClick={onRequestClose}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Modal>
  );
};

export default EditAssignmentModal;
