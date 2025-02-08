import { Driver } from "./Driver";
import { Truck } from "./Truck";

export interface Assignment {
  id: number;
  driver: Driver;
  truck: Truck;
  date: string;
}
