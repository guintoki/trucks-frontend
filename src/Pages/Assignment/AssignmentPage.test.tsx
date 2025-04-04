import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import AssignmentPage from "./AssignmentPage";
import { BrowserRouter } from "react-router-dom";
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getDrivers,
  getTrucks,
} from "../../utils/api";
import { Assignment } from "../../types/Assignment";
import { Driver } from "../../types/Driver";
import { Truck } from "../../types/Truck";

jest.mock("../../utils/api");

const drivers: Driver[] = [
  { id: 1, name: "Driver 1", license_type: "B" },
  { id: 2, name: "Driver 2", license_type: "C" },
];

const trucks: Truck[] = [
  { id: 1, plate: "ABC123", min_license_type: "B" },
  { id: 2, plate: "XYZ789", min_license_type: "C" },
];

const assignments: Assignment[] = [
  { id: 1, driver: drivers[0], truck: trucks[0], date: "2023-10-10" },
  { id: 2, driver: drivers[1], truck: trucks[1], date: "2023-10-11" },
];

beforeEach(() => {
  jest.clearAllMocks();
  (getAssignments as jest.Mock).mockResolvedValue(assignments);
  (getDrivers as jest.Mock).mockResolvedValue(drivers);
  (getTrucks as jest.Mock).mockResolvedValue(trucks);
});

afterEach(() => {
  cleanup();
});

test("renders AssignmentPage without errors", async () => {
  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });
  expect(await screen.findByText(/2023-10-10/i)).toBeInTheDocument();
  expect(await screen.findByText(/2023-10-11/i)).toBeInTheDocument();
});

test("creates a new assignment", async () => {
  const newAssignment = {
    id: 3,
    driver: drivers[0],
    truck: trucks[0],
    date: "2023-10-12",
  };
  (createAssignment as jest.Mock).mockResolvedValue(newAssignment);

  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });

  fireEvent.change(screen.getByLabelText(/motorista/i), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/caminhão/i), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/data/i), {
    target: { value: "2023-10-12" },
  });

  fireEvent.submit(screen.getByTestId("assignment-form"));

  expect(await screen.findByText(/2023-10-12/i)).toBeInTheDocument();
});

test("updates an assignment", async () => {
  const updatedAssignment = {
    id: 1,
    driver_id: 2,
    truck_id: 2,
    date: "2023-10-13",
  };
  (updateAssignment as jest.Mock).mockResolvedValue(updatedAssignment);

  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });

  fireEvent.click(
    screen.getAllByRole("button", { name: /editar atribuição/i })[0]
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /editar atribuição/i })
    ).toBeInTheDocument();
  });
  fireEvent.change(screen.getByLabelText(/novo motorista/i), {
    target: { value: "2" },
  });
  fireEvent.change(screen.getByLabelText(/novo caminhão/i), {
    target: { value: "2" },
  });
  fireEvent.change(screen.getByLabelText(/nova data/i), {
    target: { value: "2023-10-13" },
  });

  fireEvent.submit(screen.getByTestId("edit-assignment-form"));

  expect(await screen.findByText(/2023-10-13/i)).toBeInTheDocument();
});

test("deletes an assignment", async () => {
  (deleteAssignment as jest.Mock).mockResolvedValue({});

  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });

  const deleteButtons = await screen.findAllByRole("button", {
    name: /excluir atribuição/i,
  });
  expect(deleteButtons).toHaveLength(2);

  fireEvent.click(deleteButtons[0]);
  fireEvent.click(screen.getByRole("button", { name: /^excluir$/i }));

  await waitFor(() =>
    expect(screen.queryByText(/2023-10-10/i)).not.toBeInTheDocument()
  );
});

test("handles error during fetch in useEffect", async () => {
  (getAssignments as jest.Mock).mockRejectedValue(
    new Error("Failed to fetch assignments")
  );
  (getDrivers as jest.Mock).mockRejectedValue(
    new Error("Failed to fetch drivers")
  );
  (getTrucks as jest.Mock).mockRejectedValue(
    new Error("Failed to fetch trucks")
  );

  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/erro ao carregar dados/i)).toBeInTheDocument();
  });
});

test("handles error when deleting an assignment", async () => {
  (deleteAssignment as jest.Mock).mockRejectedValue(
    new Error("Failed to delete assignment")
  );

  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });

  const deleteButtons = await screen.findAllByRole("button", {
    name: /excluir atribuição/i,
  });
  fireEvent.click(deleteButtons[0]);
  fireEvent.click(screen.getByText(/excluir/i));

  await waitFor(() => {
    expect(screen.getByText(/erro ao excluir atribuição/i)).toBeInTheDocument();
  });
});

test("closes error toast", async () => {
  (getAssignments as jest.Mock).mockRejectedValue(
    new Error("Failed to fetch assignments")
  );
  (getDrivers as jest.Mock).mockRejectedValue(
    new Error("Failed to fetch drivers")
  );
  (getTrucks as jest.Mock).mockRejectedValue(
    new Error("Failed to fetch trucks")
  );

  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/erro ao carregar dados/i)).toBeInTheDocument();
  });

  const closeButton = screen.getByRole("button", { name: /^fechar$/i });
  fireEvent.click(closeButton);
  expect(screen.queryByText(/erro ao carregar dados/i)).not.toBeInTheDocument();
});

test("closes success toast", async () => {
  const newAssignment = {
    id: 3,
    driver: drivers[0],
    truck: trucks[0],
    date: "2023-10-12",
  };
  (createAssignment as jest.Mock).mockResolvedValue(newAssignment);

  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });

  fireEvent.change(screen.getByLabelText(/motorista/i), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/caminhão/i), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/data/i), {
    target: { value: "2023-10-12" },
  });

  fireEvent.submit(screen.getByTestId("assignment-form"));

  await waitFor(() => {
    expect(
      screen.getByText(/^atribuição adicionada com sucesso$/i)
    ).toBeInTheDocument();
  });

  const closeButton = screen.getByRole("button", { name: /^fechar$/i });
  fireEvent.click(closeButton);
  expect(
    screen.queryByText(/^atribuição adicionada com sucesso$/i)
  ).not.toBeInTheDocument();
});

test("closes delete assignment modal on request close", async () => {
  render(
    <BrowserRouter>
      <AssignmentPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { level: 2, name: /adicionar atribuição/i })
    ).toBeInTheDocument();
  });

  const deleteButtons = await screen.findAllByRole("button", {
    name: /excluir atribuição/i,
  });
  expect(deleteButtons).toHaveLength(2);

  fireEvent.click(deleteButtons[0]);
  fireEvent.click(screen.getByText(/cancelar/i));

  await waitFor(() => {
    expect(screen.queryByText(/tem certeza/i)).not.toBeInTheDocument();
  });
});
