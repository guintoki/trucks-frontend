import { Assignment } from "../types/Assignment";
import { DriverService } from "./DriverService";
import { TruckService } from "./TruckService";

let assignments: Assignment[] = [];
let nextId = 1;

export const AssignmentService = {
  getAll: (): Assignment[] => {
    return assignments;
  },
  getById: (id: number): Assignment | undefined => {
    return assignments.find((assignment) => assignment.id === id);
  },
  create: (assignment: Omit<Assignment, "id">): string | void => {
    const driver = DriverService.getById(assignment.driver.id);
    const truck = TruckService.getById(assignment.truck.id);

    if (!driver || !truck) {
      return "Driver or Truck not found";
    }

    if (!isLicenseCompatible(driver.license_type, truck.min_license_type)) {
      return "Driver license type is not compatible with the truck";
    }

    const isDriverAssigned = assignments.some(
      (a) => a.driver.id === assignment.driver.id && a.date === assignment.date
    );
    const isTruckAssigned = assignments.some(
      (a) => a.truck.id === assignment.truck.id && a.date === assignment.date
    );

    if (isDriverAssigned || isTruckAssigned) {
      return "Driver or Truck is already assigned on this date";
    }

    const newAssignment = { id: nextId++, ...assignment };
    assignments.push(newAssignment);
    return newAssignment.id.toString();
  },
  update: (
    id: number,
    updatedAssignment: Omit<Assignment, "id">
  ): string | void => {
    const index = assignments.findIndex((assignment) => assignment.id === id);
    if (index !== -1) {
      const driver = DriverService.getById(updatedAssignment.driver.id);
      const truck = TruckService.getById(updatedAssignment.truck.id);

      if (!driver || !truck) {
        return "Driver or Truck not found";
      }

      if (
        !isLicenseCompatible(
          updatedAssignment.driver.license_type,
          updatedAssignment.truck.min_license_type
        )
      ) {
        return "Driver license type is not compatible with the truck";
      }

      const isDriverAssigned = assignments.some(
        (a) =>
          a.driver.id === updatedAssignment.driver.id &&
          a.date === updatedAssignment.date &&
          a.id !== id
      );
      const isTruckAssigned = assignments.some(
        (a) =>
          a.truck.id === updatedAssignment.truck.id &&
          a.date === updatedAssignment.date &&
          a.id !== id
      );
      console.log(isDriverAssigned, isTruckAssigned);

      if (isDriverAssigned || isTruckAssigned) {
        return "Driver or Truck is already assigned on this date";
      }

      assignments[index] = { id, ...updatedAssignment };
    }
  },
  delete: (id: number): void => {
    assignments = assignments.filter((assignment) => assignment.id !== id);
  },
};

const isLicenseCompatible = (
  driverLicense: string,
  truckLicense: string
): boolean => {
  const licenseOrder = ["A", "B", "C", "D", "E"];
  return (
    licenseOrder.indexOf(driverLicense) >= licenseOrder.indexOf(truckLicense)
  );
};
