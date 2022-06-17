import { Plan } from "../entities/Abastraction/plan.entity";
import { City } from "../value-object/city.value";
import { TypePlan } from "../entities/Implementation/TypePlan";

export class PlanFactory {
  public static createFrom(id: number, price: number, travelDays: number, city: City, typePlan: TypePlan): Plan {
    return new Plan(id, price, travelDays, city, typePlan);
  }

}