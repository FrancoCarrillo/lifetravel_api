import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AddPlan } from "../../commands/add-plan.command";
import { Repository } from "typeorm";
import { PlanTypeORM } from "../../../infrastructure/persistence/typeorm/entities/plan.typeorm";
import { PlanMapper } from "../../mapper/plan.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "../../../domain/value-object/city.value";
import { BeachTypePlan } from "../../../domain/entities/Concrete Implementations/BeachTypePlan";
import { CityTypeORM } from "../../../infrastructure/persistence/typeorm/entities/city.typeorm";
import { CultureTypePlan } from "../../../domain/entities/Concrete Implementations/CultureTypePlan";
import { NationalPlans } from "../../../domain/entities/Refined Abstraction/NationalPlans";
import { InternationalPlan } from "../../../domain/entities/Refined Abstraction/InternationalPlan";

@CommandHandler(AddPlan)
export class AddPlanHandler implements ICommandHandler<AddPlan> {
  constructor(
    @InjectRepository(PlanTypeORM)
    private planRepository: Repository<PlanTypeORM>,
    @InjectRepository(CityTypeORM)
    private cityRepository: Repository<CityTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AddPlan) {
    let planId: number = 0;
    const price: number = command.price;
    const travelDays: number = command.travelDays;

    const city: City = new City();
    city.id = command.cityId;

    const cityTypeORM: CityTypeORM = await this.cityRepository.createQueryBuilder()
      .where("id = :id")
      .setParameter("id", command.cityId)
      .getOne()
    const kind_city: number = cityTypeORM.kindCityId;

    let typePlan: any;
    if(kind_city === 1) typePlan = new CultureTypePlan();
    else if(kind_city === 2) typePlan = new BeachTypePlan();

    const countryId: number = cityTypeORM.countryId;

    let planType: any;
    if(countryId === 1) planType = new NationalPlans(planId, price, travelDays, city, typePlan)
    else planType = new InternationalPlan(planId, price, travelDays, city, typePlan)

    planType.changePrice();

    let planTypeORM: PlanTypeORM = PlanMapper.toTypeORM(planType);
    planTypeORM = await this.planRepository.save(planTypeORM);

    if(planTypeORM == null) {
      return planId;
    }

    planId = Number(planTypeORM.id);
    planType.changeId(planId);
    planType = this.publisher.mergeObjectContext(planType);
    planType.open();
    planType.commit();

    return planId;
  }
}