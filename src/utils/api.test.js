import {
  getDrivers,
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver,
  getTrucks,
  getTruck,
  createTruck,
  updateTruck,
  deleteTruck,
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "./api";

const API_URL = "http://localhost:5000";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test("getDrivers makes a GET request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([]),
  });

  await getDrivers();

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/drivers`);
});

test("getDriver makes a GET request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({}),
  });

  await getDriver(1);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/drivers/1`);
});

test("createDriver makes a POST request to the correct URL", async () => {
  const driverData = { name: "John Doe" };
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(driverData),
  });

  await createDriver(driverData);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/drivers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driverData),
  });
});

test("updateDriver makes a PUT request to the correct URL", async () => {
  const driverData = { name: "John Doe" };
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(driverData),
  });

  await updateDriver(1, driverData);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/drivers/1`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driverData),
  });
});

test("deleteDriver makes a DELETE request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({}),
  });

  await deleteDriver(1);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/drivers/1`, {
    method: "DELETE",
  });
});

test("getTrucks makes a GET request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([]),
  });

  await getTrucks();

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/trucks`);
});

test("getTruck makes a GET request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({}),
  });

  await getTruck(1);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/trucks/1`);
});

test("createTruck makes a POST request to the correct URL", async () => {
  const truckData = { plate: "ABC123" };
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(truckData),
  });

  await createTruck(truckData);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/trucks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(truckData),
  });
});

test("updateTruck makes a PUT request to the correct URL", async () => {
  const truckData = { plate: "ABC123" };
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(truckData),
  });

  await updateTruck(1, truckData);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/trucks/1`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(truckData),
  });
});

test("deleteTruck makes a DELETE request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({}),
  });

  await deleteTruck(1);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/trucks/1`, {
    method: "DELETE",
  });
});

test("getAssignments makes a GET request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([]),
  });

  await getAssignments();

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/assignments`);
});

test("getAssignment makes a GET request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({}),
  });

  await getAssignment(1);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/assignments/1`);
});

test("createAssignment makes a POST request to the correct URL", async () => {
  const assignmentData = { driver_id: 1, truck_id: 1, date: "2023-10-10" };
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(assignmentData),
  });

  await createAssignment(assignmentData);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/assignments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignmentData),
  });
});

test("updateAssignment makes a PUT request to the correct URL", async () => {
  const assignmentData = { driver_id: 1, truck_id: 1, date: "2023-10-10" };
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(assignmentData),
  });

  await updateAssignment(1, assignmentData);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/assignments/1`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignmentData),
  });
});

test("deleteAssignment makes a DELETE request to the correct URL", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({}),
  });

  await deleteAssignment(1);

  expect(fetch).toHaveBeenCalledWith(`${API_URL}/assignments/1`, {
    method: "DELETE",
  });
});
