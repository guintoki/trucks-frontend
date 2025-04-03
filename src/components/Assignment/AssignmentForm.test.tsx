import { render, screen, fireEvent } from "@testing-library/react";
import AssignmentForm from "./AssignmentForm";
import { BrowserRouter } from "react-router-dom";
import { Driver } from "../../types/Driver";
import { Truck } from "../../types/Truck";
import { LicenseType } from "../../types/LicenseType";
import { createAssignment } from "../../utils/api";

jest.mock("../../utils/api");

const mockDrivers: Driver[] = [
  { id: 1, name: "Motorista 1", license_type: "B" },
  { id: 2, name: "Motorista 2", license_type: "C" },
];

const mockTrucks: Truck[] = [
  { id: 1, plate: "ABC1234", min_license_type: "B" },
  { id: 2, plate: "XYZ5678", min_license_type: "C" },
];

describe("AssignmentForm", () => {
  it("renders form fields correctly", () => {
    render(
      <BrowserRouter>
        <AssignmentForm
          drivers={mockDrivers}
          trucks={mockTrucks}
          setAssignments={jest.fn()}
          setError={jest.fn()}
          setLoading={jest.fn()}
          onSubmit={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/motorista/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/caminhão/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument();
    expect(screen.getByText(/adicionar atribuição/i)).toBeInTheDocument();
  });

  it("submits form with correct data", () => {
    const onSubmit = jest.fn();
    render(
      <BrowserRouter>
        <AssignmentForm
          drivers={mockDrivers}
          trucks={mockTrucks}
          setAssignments={jest.fn()}
          setError={jest.fn()}
          setLoading={jest.fn()}
          onSubmit={onSubmit}
        />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/motorista/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/caminhão/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/data/i), {
      target: { value: "2024-03-20" },
    });

    fireEvent.click(screen.getByText(/adicionar atribuição/i));

    expect(onSubmit).toHaveBeenCalledWith({
      id: expect.any(Number),
      driver: mockDrivers[0],
      truck: mockTrucks[0],
      date: "2024-03-20",
    });
  });

  it("disables submit button when form is invalid", () => {
    render(
      <BrowserRouter>
        <AssignmentForm
          drivers={mockDrivers}
          trucks={mockTrucks}
          setAssignments={jest.fn()}
          setError={jest.fn()}
          setLoading={jest.fn()}
          onSubmit={jest.fn()}
        />
      </BrowserRouter>
    );

    const submitButton = screen.getByText(/adicionar atribuição/i);
    expect(submitButton).toBeDisabled();
  });
});
