import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AssignmentForm from "./AssignmentForm";
import { BrowserRouter } from "react-router-dom";
import { Driver } from "../../types/Driver";
import { Truck } from "../../types/Truck";
import { LicenseType } from "../../types/LicenseType";
import { createAssignment } from "../../utils/api";

jest.mock("../../utils/api");

const drivers: Driver[] = [
  { id: 1, name: "Driver 1", license_type: "B" as LicenseType },
  { id: 2, name: "Driver 2", license_type: "C" as LicenseType },
];

const trucks: Truck[] = [
  { id: 1, plate: "ABC123", min_license_type: "B" as LicenseType },
  { id: 2, plate: "XYZ789", min_license_type: "C" as LicenseType },
];

test("Renders AssignmentForm without errors", () => {
  render(
    <BrowserRouter>
      <AssignmentForm
        drivers={drivers}
        trucks={trucks}
        setAssignments={jest.fn()}
        setError={jest.fn()}
        setSuccess={jest.fn()}
        setLoading={jest.fn()}
        onSubmit={jest.fn()}
      />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/driver/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/truck/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
});

test("Submits the form with correct data", async () => {
  const onSubmit = jest.fn();
  (createAssignment as jest.Mock).mockResolvedValue({
    id: 1,
    driver_id: "1",
    truck_id: "1",
    date: "2023-10-10",
  });

  render(
    <BrowserRouter>
      <AssignmentForm
        drivers={drivers}
        trucks={trucks}
        setAssignments={jest.fn()}
        setError={jest.fn()}
        setSuccess={jest.fn()}
        setLoading={jest.fn()}
        onSubmit={onSubmit}
      />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/driver/i), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/truck/i), { target: { value: "1" } });
  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2023-10-10" },
  });

  fireEvent.submit(screen.getByTestId("assignment-form"));

  await waitFor(() =>
    expect(onSubmit).toHaveBeenCalledWith({
      id: 1,
      driver_id: "1",
      truck_id: "1",
      date: "2023-10-10",
    })
  );
});
