import { EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AddPlan } from "../../commands/add-plan.command";
import { Repository } from "typeorm";
import { PlanTypeORM } from "../../../infrastructure/persistence/typeorm/entities/plan.typeorm";
import { AppNotification } from "../../../../common/application/app.notification";
import { Plan } from "../../../domain/entities/plan.entity";
import { PlanFactory } from "../../../domain/factories/plan.factory";
import { PlanMapper } from "../../mapper/plan.mapper";

export class AddPlanHandler implements ICommandHandler<AddPlan> {
  constructor(
    private planRepository: Repository<PlanTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AddPlan) {
    let planId: number = 0;
    const name: string = command.name;
    const description: string  = command.description;
    const price: number = command.price;
    const nameCity: string  = command.nameCity;
    const nameCountry: string  = command.nameCountry;
    const nameMoney: string  = command.nameMoney;
    const changeValue_money: number = command.changeValue_money;
    const kindCityName: string  = command.kindCityName;
    const kindCityDescription: string  = command.kindCityDescription;
    const startDate: Date = command.startDate;
    const endDate: Date = command.endDate;
    const clientId: number = command.clientId;

    let plan: Plan = PlanFactory.createFrom(name, description, price, nameCity, nameCountry, nameMoney, changeValue_money, kindCityName, kindCityDescription, startDate, endDate, clientId);
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