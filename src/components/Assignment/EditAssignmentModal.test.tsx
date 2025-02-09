import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "react-modal";
import EditAssignmentModal from "./EditAssignmentModal";
import { BrowserRouter } from "react-router-dom";
import { Driver } from "../../types/Driver";
import { Truck } from "../../types/Truck";
import { LicenseType } from "../../types/LicenseType";
import { updateAssignment } from "../../utils/api";

jest.mock("../../utils/api");

const drivers: Driver[] = [
  { id: 1, name: "Driver 1", license_type: "B" },
  { id: 2, name: "Driver 2", license_type: "C" },
];

const trucks: Truck[] = [
  { id: 1, plate: "ABC123", min_license_type: "B" },
  { id: 2, plate: "XYZ789", min_license_type: "C" },
];

const assignment = {
  id: 1,
  driver: { id: 1, name: "Driver 1", license_type: "B" as LicenseType },
  truck: { id: 1, plate: "ABC123", min_license_type: "B" as LicenseType },
  date: "2023-10-10",
};

beforeAll(() => {
  Modal.setAppElement("body");
});

test("Renders EditAssignmentModal without errors", () => {
  render(
    <BrowserRouter>
      <EditAssignmentModal
        isOpen={true}
        onRequestClose={jest.fn()}
        onSubmit={jest.fn()}
        drivers={drivers}
        trucks={trucks}
        assignment={assignment}
        setError={jest.fn()}
        setSuccess={jest.fn()}
        setLoading={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/driver/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/truck/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
});

test("Submits the form with correct data", async () => {
  const onSubmit = jest.fn();
  (updateAssignment as jest.Mock).mockResolvedValue({});

  render(
    <BrowserRouter>
      <EditAssignmentModal
        isOpen={true}
        onRequestClose={jest.fn()}
        onSubmit={onSubmit}
        drivers={drivers}
        trucks={trucks}
        assignment={assignment}
        setError={jest.fn()}
        setSuccess={jest.fn()}
        setLoading={jest.fn()}
      />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/driver/i), {
    target: { value: "2" },
  });
  fireEvent.change(screen.getByLabelText(/truck/i), { target: { value: "2" } });
  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2023-10-11" },
  });

  fireEvent.submit(screen.getByTestId("edit-assignment-form"));

  await waitFor(() =>
    expect(onSubmit).toHaveBeenCalledWith({
      ...assignment,
      driver: drivers[1],
      truck: trucks[1],
      driver_id: "2",
      truck_id: "2",
      date: "2023-10-11",
    })
  );
});
