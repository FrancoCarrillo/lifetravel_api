import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AddPlan } from "../../commands/add-plan.command";
import { Repository } from "typeorm";
import { PlanTypeORM } from "../../../infrastructure/persistence/typeorm/entities/plan.typeorm";
import { Plan } from "../../../domain/entities/plan.entity";
import { PlanFactory } from "../../../domain/factories/plan.factory";
import { PlanMapper } from "../../mapper/plan.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "../../../domain/value-object/city.value";

@CommandHandler(AddPlan)
export class AddPlanHandler implements ICommandHandler<AddPlan> {
  constructor(
    @InjectRepository(PlanTypeORM)
    private planRepository: Repository<PlanTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AddPlan) {
    let planId: number = 0;
    const price: number = command.price;
    const travelDays: number = command.travelDays;

    const city: City = new City();
    city.id = command.cityId;

    let plan: Plan = PlanFactory.createFrom(planId, price, travelDays, city);
    let planTypeORM: PlanTypeORM = PlanMapper.toTypeORM(plan);
    planTypeORM = await this.planRepository.save(planTypeORM);

    if(planTypeORM == null) {
      return planId;
    }

    planId = Number(planTypeORM.id);
    plan.changeId(planId);
    plan = this.publisher.mergeObjectContext(plan);
    plan.open();
    plan.commit();

    return planId;
  }
}