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

    const planResponse: any = await this.commandBus.execute(addPlan);

    const addPlanResponse: AddPlanResponseDto = new AddPlanResponseDto(
      planResponse.id,
      planResponse.price,
      addPlan.travelDays,
      addPlan.cityId,
      planResponse.description,
    );
    return Result.ok(addPlanResponse);
  }
}
