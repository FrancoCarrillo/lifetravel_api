import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddPlanValidator } from "../validators/add-plan.validator";
import { AddPlanRequestDto } from "../dtos/request/add-plan-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { AddPlanResponseDto } from "../dtos/response/add-plan-response.dto";
import { AddPlan } from "../commands/add-plan.command";

@Injectable()
export class PlansApplicationService {
  constructor(
    private commandBus: CommandBus,
    private addPlanValidator: AddPlanValidator,
  ) {}

  async add(addPlanRequestDto: AddPlanRequestDto): Promise<Result<AppNotification, AddPlanResponseDto>> {
    const notification: AppNotification = await this.addPlanValidator.validate(addPlanRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const addPlan: AddPlan = new AddPlan(
      addPlanRequestDto.name,
      addPlanRequestDto.description,
      addPlanRequestDto.nameCity,
      addPlanRequestDto.nameCountry,
      addPlanRequestDto.nameMoney,
      addPlanRequestDto.changeValue_money,
      addPlanRequestDto.kindCityName,
      addPlanRequestDto.kindCityDescription,
      addPlanRequestDto.price,
      addPlanRequestDto.startDate,
      addPlanRequestDto.endDate,
      addPlanRequestDto.clientsId
    );

    const planId: number = await this.commandBus.execute(addPlan);

    const addPlanResponse: AddPlanResponseDto = new AddPlanResponseDto(
      planId,
      addPlan.name,
      addPlan.description,
      addPlan.nameCity,
      addPlan.nameCountry,
      addPlan.nameMoney,
      addPlan.changeValue_money,
      addPlan.kindCityName,
      addPlan.kindCityDescription,
      addPlan.price,
      addPlan.startDate,
      addPlan.endDate,
      addPlan.clientId
    );
    return Result.ok(addPlanResponse);
  }
}
