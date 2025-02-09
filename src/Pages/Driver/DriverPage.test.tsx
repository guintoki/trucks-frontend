import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DriverPage from "./DriverPage";
import { BrowserRouter } from "react-router-dom";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../../utils/api";
import { Driver } from "../../types/Driver";

jest.mock("../../utils/api");

const drivers: Driver[] = [
  { id: 1, name: "Driver 1", license_type: "B" },
  { id: 2, name: "Driver 2", license_type: "C" },
];

beforeEach(() => {
  (getDrivers as jest.Mock).mockResolvedValue(drivers);
});

test("renders DriverPage without errors", async () => {
  render(
    <BrowserRouter>
      <DriverPage />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add driver/i })
    ).toBeInTheDocument();
  });

  expect(await screen.findByText(/driver 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/driver 2/i)).toBeInTheDocument();
});

test("creates a new driver", async () => {
  const newDriver = { id: 3, name: "Driver 3", license_type: "A" };
  (createDriver as jest.Mock).mockResolvedValue(newDriver);

  render(
    <BrowserRouter>
      <DriverPage />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add driver/i })
    ).toBeInTheDocument();
  });
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Driver 3" },
  });
  fireEvent.change(screen.getByLabelText(/license type/i), {
    target: { value: "A" },
  });
  fireEvent.click(screen.getByText(/save driver/i));

  expect(await screen.findByText(/driver 3/i)).toBeInTheDocument();
});

test("updates a driver", async () => {
  const updatedDriver = { id: 1, name: "Updated Driver 1", license_type: "B" };
  (updateDriver as jest.Mock).mockResolvedValue(updatedDriver);

  render(
    <BrowserRouter>
      <DriverPage />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add driver/i })
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
  fireEvent.change(screen.getByLabelText(/new name/i), {
    target: { value: "Updated Driver 1" },
  });
  fireEvent.click(screen.getByText(/update driver/i));

  expect(await screen.findByText(/driver 1/i)).toBeInTheDocument();
});

test("deletes a driver", async () => {
  (deleteDriver as jest.Mock).mockResolvedValue({});

  render(
    <BrowserRouter>
      <DriverPage />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /add driver/i })
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);
  fireEvent.click(screen.getByText(/yes/i));

  await waitFor(() =>
    expect(screen.queryByText(/driver 1/i)).not.toBeInTheDocument()
  );
});
