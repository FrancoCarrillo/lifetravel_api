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

    const addPlanResponse: AddPlanResponseDto = new AddPlanResponseDto(
      planId,
      addPlan.price,
      addPlan.travelDays,
      addPlan.cityId
    );
    return Result.ok(addPlanResponse);
  }
}
