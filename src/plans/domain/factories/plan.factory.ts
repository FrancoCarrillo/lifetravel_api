import { Plan } from "../entities/plan.entity";
import { City } from "../value-object/city.value";

export class PlanFactory {
  public static createFrom(id: number, price: number, travelDays: number, city: City): Plan {
    return new Plan(id, price, travelDays, city);
  }

}