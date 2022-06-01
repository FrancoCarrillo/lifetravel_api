import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PlansApplicationService } from '../application/services/plans-application.service';
import { AddPlanRequestDto } from "../application/dtos/request/add-plan-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { AddPlanResponseDto } from "../application/dtos/response/add-plan-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetPlanQuery } from "../application/queries/get-plan.query";

@Controller('plans')
export class PlansController {
  constructor(
    private readonly plansApplicationService: PlansApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

@Post()
async add(
  @Body() addPlanRequestDto: AddPlanRequestDto,
  @Res({ passthrough: true }) response
): Promise<object> {
  try{
    const result: Result<AppNotification, AddPlanResponseDto> = await this.plansApplicationService.add(addPlanRequestDto);
    if (result.isSuccess()){
      return ApiController.created(response, result.value);
    }
    return ApiController.error(response, result.error.getErrors());
  }
  catch (error){
    return ApiController.serverError(response, error);
  }
}

@Get()
async getPlan(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const plans = await this.queryBus.execute( new GetPlanQuery());
      return ApiController.ok(response, plans);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
}
}