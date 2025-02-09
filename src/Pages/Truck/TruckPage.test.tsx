import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TruckPage from "./TruckPage";
import { BrowserRouter } from "react-router-dom";
import {
  getTrucks,
  createTruck,
  updateTruck,
  deleteTruck,
} from "../../utils/api";
import { Truck } from "../../types/Truck";

jest.mock("../../utils/api");

const trucks: Truck[] = [
  { id: 1, plate: "ABC123", min_license_type: "B" },
  { id: 2, plate: "XYZ789", min_license_type: "C" },
];

beforeEach(() => {
  (getTrucks as jest.Mock).mockResolvedValue(trucks);
});

test("renders TruckPage without errors", async () => {
  render(
    <BrowserRouter>
      <TruckPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add truck/i })
    ).toBeInTheDocument();
  });

  expect(await screen.findByText(/abc123/i)).toBeInTheDocument();
  expect(await screen.findByText(/xyz789/i)).toBeInTheDocument();
});

test("creates a new truck", async () => {
  const newTruck = { id: 3, plate: "DEF456", min_license_type: "A" };
  (createTruck as jest.Mock).mockResolvedValue(newTruck);

  render(
    <BrowserRouter>
      <TruckPage />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add truck/i })
    ).toBeInTheDocument();
  });

  fireEvent.change(screen.getByLabelText(/plate/i), {
    target: { value: "DEF456" },
  });
  fireEvent.change(screen.getByLabelText(/license type/i), {
    target: { value: "A" },
  });
  fireEvent.click(screen.getByText(/create truck/i));

  expect(await screen.findByText(/def456/i)).toBeInTheDocument();
});

test("updates a truck", async () => {
  const updatedTruck = { id: 1, plate: "UPDATED123", min_license_type: "B" };
  (updateTruck as jest.Mock).mockResolvedValue(updatedTruck);

  render(
    <BrowserRouter>
      <TruckPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add truck/i })
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /edit truck/i })
    ).toBeInTheDocument();
  });
  fireEvent.change(screen.getByLabelText(/new plate/i), {
    target: { value: "UPDATED123" },
  });
  fireEvent.click(screen.getByText(/save update/i));

  expect(await screen.findByText(/updated123/i)).toBeInTheDocument();
});

test("deletes a truck", async () => {
  (deleteTruck as jest.Mock).mockResolvedValue({});

  render(
    <BrowserRouter>
      <TruckPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add truck/i })
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);
  fireEvent.click(screen.getByText(/yes/i));

  await waitFor(() =>
    expect(screen.queryByText(/abc123/i)).not.toBeInTheDocument()
  );
});
