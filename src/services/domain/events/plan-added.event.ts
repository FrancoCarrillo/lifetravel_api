import { City } from "../value-object/city.value";

export class PlanAdded {
  constructor(
    public readonly id: number,
    public readonly price: number,
    public readonly travelDays: number,
    public readonly clientId: City
  ) {}

}