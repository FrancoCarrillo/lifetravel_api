import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddPlanValidator } from "../validators/add-plan.validator";
import { AddPlanRequestDto } from "../dtos/request/add-plan-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { AddPlanResponseDto } from "../dtos/response/add-plan-response.dto";
import { AddPlan } from "../commands/add-plan.command";
import { CityTypeORM } from "../../infrastructure/persistence/typeorm/entities/city.typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PlansApplicationService {
  constructor(
    private commandBus: CommandBus,
    private addPlanValidator: AddPlanValidator,
    @InjectRepository(CityTypeORM)
    private cityRepository: Repository<CityTypeORM>,
  ) {}

  async add(
    addPlanRequestDto: AddPlanRequestDto
  ): Promise<Result<AppNotification, AddPlanResponseDto>> {
    const notification: AppNotification = await this.addPlanValidator.validate(addPlanRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const addPlan: AddPlan = new AddPlan(
      addPlanRequestDto.price,
      addPlanRequestDto.travelDays,
      addPlanRequestDto.cityId
    );

    const planId: number = await this.commandBus.execute(addPlan);

    const cityTypeORM: CityTypeORM = await this.cityRepository.createQueryBuilder()
      .where("id = :id")
      .setParameter("id", addPlanRequestDto.cityId)
      .getOne()

    if(cityTypeORM.countryId !== 1 ){
      addPlan.price *= 0.27;
    }

    const addPlanResponse: AddPlanResponseDto = new AddPlanResponseDto(
      planId,
      addPlan.price,
      addPlan.travelDays,
      addPlan.cityId
    );
    return Result.ok(addPlanResponse);
  }
}
