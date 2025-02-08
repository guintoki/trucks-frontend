import { TruckService } from "./TruckService";
import { Truck } from "../types/Truck";

describe("TruckService", () => {
  beforeEach(() => {
    TruckService.create({ id: 1, plate: "ABC-1234", min_license_type: "A" });
    TruckService.create({ id: 2, plate: "XYZ-5678", min_license_type: "B" });
  });

  afterEach(() => {
    TruckService.delete(1);
    TruckService.delete(2);
  });

  test("should get all trucks", () => {
    const trucks = TruckService.getAll();
    expect(trucks.length).toBe(2);
  });

  test("should get truck by id", () => {
    const truck = TruckService.getById(1);
    expect(truck).toEqual({ id: 1, plate: "ABC-1234", min_license_type: "A" });
  });

  test("should create a new truck", () => {
    const newTruck: Truck = { id: 3, plate: "LMN-9101", min_license_type: "C" };
    TruckService.create(newTruck);
    const truck = TruckService.getById(3);
    expect(truck).toEqual(newTruck);
    TruckService.delete(3);
  });

  test("should update a truck", () => {
    const updatedTruck: Truck = {
      id: 1,
      plate: "DEF-2345",
      min_license_type: "A",
    };
    TruckService.update(1, updatedTruck);
    const truck = TruckService.getById(1);
    expect(truck).toEqual(updatedTruck);
  });

  test("should delete a truck", () => {
    TruckService.delete(1);
    const truck = TruckService.getById(1);
    expect(truck).toBeUndefined();
  });
});
