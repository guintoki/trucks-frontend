import { AssignmentService } from "./AssignmentService";
import { DriverService } from "./DriverService";
import { TruckService } from "./TruckService";
import { Assignment } from "../types/Assignment";

describe("AssignmentService", () => {
  beforeEach(() => {
    DriverService.create({ id: 1, name: "John Doe", license_type: "A" });
    TruckService.create({ id: 1, plate: "ABC-1234", min_license_type: "A" });
    AssignmentService.create({
      driver: { id: 1, name: "John Doe", license_type: "A" },
      truck: { id: 1, plate: "ABC-1234", min_license_type: "A" },
      date: "2023-01-01",
    });
  });

  afterEach(() => {
    AssignmentService.delete(1);
    DriverService.delete(1);
    TruckService.delete(1);
  });

  test("should get all assignments", () => {
    const assignments = AssignmentService.getAll();
    expect(assignments.length).toBe(1);
  });

  test("should get assignment by id", () => {
    const assignments = AssignmentService.getAll();
    const assignment = AssignmentService.getById(assignments[0].id);
    expect(assignment).toEqual({
      id: assignments[0].id,
      driver: { id: 1, name: "John Doe", license_type: "A" },
      truck: { id: 1, plate: "ABC-1234", min_license_type: "A" },
      date: "2023-01-01",
    });
  });

  test("should create a new assignment", () => {
    const newAssignment: Omit<Assignment, "id"> = {
      driver: { id: 1, name: "John Doe", license_type: "A" },
      truck: { id: 1, plate: "ABC-1234", min_license_type: "A" },
      date: "2023-01-02",
    };
    AssignmentService.create(newAssignment);
    const assignments = AssignmentService.getAll();
    const assignment = AssignmentService.getById(assignments[1].id);
    expect(assignment).toEqual({ id: assignments[1].id, ...newAssignment });
    AssignmentService.delete(assignments[1].id);
  });

  test("should update an assignment", () => {
    const updatedAssignment: Omit<Assignment, "id"> = {
      driver: { id: 1, name: "John Doe", license_type: "A" },
      truck: { id: 1, plate: "ABC-1234", min_license_type: "A" },
      date: "2023-01-03",
    };
    const assignments = AssignmentService.getAll();
    AssignmentService.update(assignments[0].id, updatedAssignment);
    const assignment = AssignmentService.getById(assignments[0].id);
    expect(assignment).toEqual({ id: assignments[0].id, ...updatedAssignment });
  });

  test("should delete an assignment", () => {
    const assignments = AssignmentService.getAll();
    AssignmentService.delete(assignments[0].id);
    const assignment = AssignmentService.getById(assignments[0].id);
    expect(assignment).toBeUndefined();
  });
});
