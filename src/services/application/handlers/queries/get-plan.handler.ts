import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPlanQuery } from "../../queries/get-plan.query";
import { getManager } from "typeorm";
import { GetPlansDto } from "../../dtos/queries/get-plans.dto";

@QueryHandler(GetPlanQuery)
export class GetPlanHandler implements IQueryHandler<GetPlanQuery> {
  constructor() {}

  async execute (query: GetPlanQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      price,
      travel_days as travelDays,
      city_id as cityId
    FROM 
      plans;`;

    const ormPlans  = await manager.query(sql);
    if (ormPlans.length <= 0){
      return [];
    }

    const plans: GetPlansDto[] = ormPlans.map(function(ormPlan) {
      let planDto = new GetPlansDto();
      planDto.id = Number(ormPlan.id);
      planDto.price = ormPlan.price;
      planDto.travelDays = ormPlan.travelDays;
      planDto.cityId = ormPlan.cityId;
      return planDto;
    })

    return plans;
  }
}