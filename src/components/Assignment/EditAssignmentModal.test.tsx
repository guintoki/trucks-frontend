import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "react-modal";
import EditAssignmentModal from "./EditAssignmentModal";
import { BrowserRouter } from "react-router-dom";
import { Driver } from "../../types/Driver";
import { Truck } from "../../types/Truck";
import { LicenseType } from "../../types/LicenseType";
import { updateAssignment } from "../../utils/api";
import { Assignment } from "../../types/Assignment";

jest.mock("../../utils/api");

const mockDrivers: Driver[] = [
  { id: 1, name: "Motorista 1", license_type: "B" },
  { id: 2, name: "Motorista 2", license_type: "C" },
];

const mockTrucks: Truck[] = [
  { id: 1, plate: "ABC1234", min_license_type: "B" },
  { id: 2, plate: "XYZ5678", min_license_type: "C" },
];

const assignment: Assignment = {
  id: 1,
  driver: mockDrivers[0],
  truck: mockTrucks[0],
  date: "2024-03-20",
};

beforeAll(() => {
  Modal.setAppElement("body");
});

describe("EditAssignmentModal", () => {
  it("renders modal with correct data", () => {
    render(
      <BrowserRouter>
        <EditAssignmentModal
          isOpen={true}
          onRequestClose={jest.fn()}
          onSubmit={jest.fn()}
          drivers={mockDrivers}
          trucks={mockTrucks}
          assignment={assignment}
          setError={jest.fn()}
          setLoading={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/editar atribuição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motorista/i)).toHaveValue("1");
    expect(screen.getByLabelText(/caminhão/i)).toHaveValue("1");
    expect(screen.getByLabelText(/data/i)).toHaveValue("2024-03-20");
  });

  it("calls onSubmit with correct data when form is submitted", async () => {
    const onSubmit = jest.fn();
    (updateAssignment as jest.Mock).mockResolvedValue({});

    render(
      <BrowserRouter>
        <EditAssignmentModal
          isOpen={true}
          onRequestClose={jest.fn()}
          onSubmit={onSubmit}
          drivers={mockDrivers}
          trucks={mockTrucks}
          assignment={assignment}
          setError={jest.fn()}
          setLoading={jest.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/motorista/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/caminhão/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/data/i), {
      target: { value: "2024-03-21" },
    });

    fireEvent.click(screen.getByText(/salvar/i));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        id: 1,
        driver: mockDrivers[1],
        truck: mockTrucks[1],
        date: "2024-03-21",
      });
    });
  });

  it("calls onRequestClose when cancel button is clicked", () => {
    const onRequestClose = jest.fn();
    render(
      <BrowserRouter>
        <EditAssignmentModal
          isOpen={true}
          onRequestClose={onRequestClose}
          onSubmit={jest.fn()}
          drivers={mockDrivers}
          trucks={mockTrucks}
          assignment={assignment}
          setError={jest.fn()}
          setLoading={jest.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/cancelar/i));
    expect(onRequestClose).toHaveBeenCalled();
  });
});
