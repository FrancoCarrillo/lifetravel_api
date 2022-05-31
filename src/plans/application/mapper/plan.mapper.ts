import { Plan } from "../../domain/entities/plan.entity";
import { PlanTypeORM } from "../../infrastructure/persistence/typeorm/entities/plan.typeorm";

export class PlanMapper{
  public static toTypeORM(plan: Plan): PlanTypeORM {
    const planTypeORM: PlanTypeORM = new PlanTypeORM();
    planTypeORM.id = plan.id;
    planTypeORM.price = plan.price;
    planTypeORM.travelDays = plan.travelDays;
    //Llenar correactamente este valor
    planTypeORM.cityId = 1;

    return planTypeORM;
  }
}