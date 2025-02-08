import { Truck } from "../types/Truck";

let trucks: Truck[] = [];

export const TruckService = {
  getAll: (): Truck[] => {
    return trucks;
  },
  getById: (id: number): Truck | undefined => {
    return trucks.find((truck) => truck.id === id);
  },
  create: (truck: Truck): void => {
    trucks.push(truck);
  },
  update: (id: number, updatedTruck: Truck): void => {
    const index = trucks.findIndex((truck) => truck.id === id);
    if (index !== -1) {
      trucks[index] = updatedTruck;
    }
  },
  delete: (id: number): void => {
    trucks = trucks.filter((truck) => truck.id !== id);
  },
};
