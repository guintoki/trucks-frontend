const API_URL = "http://localhost:5000";

export async function getDrivers() {
  const response = await fetch(`${API_URL}/drivers`);
  return response.json();
}

export async function getDriver(driverId) {
  const response = await fetch(`${API_URL}/drivers/${driverId}`);
  return response.json();
}

export async function createDriver(driverData) {
  const response = await fetch(`${API_URL}/drivers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driverData),
  });
  return response.json();
}

export async function updateDriver(driverId, driverData) {
  const response = await fetch(`${API_URL}/drivers/${driverId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driverData),
  });
  return response.json();
}

export async function deleteDriver(driverId) {
  const response = await fetch(`${API_URL}/drivers/${driverId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getTrucks() {
  const response = await fetch(`${API_URL}/trucks`);
  return response.json();
}

export async function getTruck(truckId) {
  const response = await fetch(`${API_URL}/trucks/${truckId}`);
  return response.json();
}

export async function createTruck(truckData) {
  const response = await fetch(`${API_URL}/trucks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(truckData),
  });
  return response.json();
}

export async function updateTruck(truckId, truckData) {
  const response = await fetch(`${API_URL}/trucks/${truckId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(truckData),
  });
  return response.json();
}

export async function deleteTruck(truckId) {
  const response = await fetch(`${API_URL}/trucks/${truckId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getAssignments() {
  const response = await fetch(`${API_URL}/assignments`);
  return response.json();
}

export async function getAssignment(assignmentId) {
  const response = await fetch(`${API_URL}/assignments/${assignmentId}`);
  return response.json();
}

export async function createAssignment(assignmentData) {
  const response = await fetch(`${API_URL}/assignments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignmentData),
  });
  return response.json();
}

export async function updateAssignment(assignmentId, assignmentData) {
  const response = await fetch(`${API_URL}/assignments/${assignmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignmentData),
  });
  return response.json();
}

export async function deleteAssignment(assignmentId) {
  const response = await fetch(`${API_URL}/assignments/${assignmentId}`, {
    method: "DELETE",
  });
  return response.json();
}
