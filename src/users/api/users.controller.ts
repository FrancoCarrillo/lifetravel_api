import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TravelerApplicationService } from '../application/services/traveler-application.service';
import { AgencyApplicationService } from '../application/services/agency-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterTravelerRequest } from '../application/dtos/request/register-traveler-request.dto';
import { AppNotification } from '../../common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterTravelerResponse } from '../application/dtos/response/register-traveler-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { RegisterAgency } from '../application/commands/register-agency.command';
import { RegisterAgencyRequest } from '../application/dtos/request/register-agency-request.dto';
import { RegisterAgencyResponse } from '../application/dtos/response/register-agency-response.dto';
import { GetUsersTravelerQuery } from '../application/queries/get-users-traveler.query';
import { GetUsersAgencyQuery } from '../application/queries/get-users-agency.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly travelerApplicationService: TravelerApplicationService,
    private readonly agencyApplicationService: AgencyApplicationService,
    private readonly queryBus: QueryBus,
  ) {}
  @Post('/traveler')
  async registerTraveler(
    @Body() registerTravelerRequest: RegisterTravelerRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterTravelerResponse> =
        await this.travelerApplicationService.register(registerTravelerRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/agency')
  async registerAgency(
    @Body() registerAgencyRequest: RegisterAgencyRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAgencyResponse> =
        await this.agencyApplicationService.register(registerAgencyRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/traveler')
  async getCustomersTraveler(
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const travelers = await this.queryBus.execute(
        new GetUsersTravelerQuery(),
      );
      return ApiController.ok(response, travelers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/agency')
  async getCustomersAgency(
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const agencies = await this.queryBus.execute(new GetUsersAgencyQuery());
      return ApiController.ok(response, agencies);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
