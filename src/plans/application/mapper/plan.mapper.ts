import { Plan } from "../../domain/entities/plan.entity";
import { PlanTypeORM } from "../../infrastructure/persistence/typeorm/entities/plan.typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class PlanMapper{
  public static toTypeORM(plan: Plan): PlanTypeORM {
    const planTypeORM: PlanTypeORM = new PlanTypeORM();
    planTypeORM.id = plan.id != null ? plan.id: 0;
    planTypeORM.name = plan.name;
    planTypeORM.description = plan.description;
    planTypeORM.nameCity = plan.city.name;
    planTypeORM.nameCountry = plan.city.country.name;
    planTypeORM.nameMoney = plan.city.country.money.name;
    planTypeORM.changeValue_money = plan.city.country.money.changeValue;
    // planTypeORM.kindCityName = plan.city.;
    // planTypeORM.kindCityDescription: string;
    planTypeORM.price = plan.price;
    planTypeORM.startDate = plan.rangeDate.startData;
    planTypeORM.endDate = plan.rangeDate.endDate;
    planTypeORM.clientId = plan.clientId;

    return planTypeORM;
  }
}