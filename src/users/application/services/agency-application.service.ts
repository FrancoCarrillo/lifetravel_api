import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterAgencyValidator } from '../validators/register-agency.validator';
import { RegisterAgencyRequest } from '../dtos/request/register-agency-request.dto';
import { RegisterAgencyResponse } from '../dtos/response/register-agency-response.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterAgency } from '../commands/register-agency.command';

@Injectable()
export class AgencyApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerCompanyValidator: RegisterAgencyValidator,
  ) {}

  async register(
    registerAgencyRequest: RegisterAgencyRequest,
  ): Promise<Result<AppNotification, RegisterAgencyResponse>> {
    const notification: AppNotification =
      await this.registerCompanyValidator.validate(registerAgencyRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerAgency: RegisterAgency = new RegisterAgency(
      registerAgencyRequest.name,
      registerAgencyRequest.email,
      registerAgencyRequest.password,
    );
    const userId = await this.commandBus.execute(registerAgency);
    const registerAgencyResponse: RegisterAgencyResponse =
      new RegisterAgencyResponse(
        userId,
        registerAgencyRequest.name,
        registerAgencyRequest.email,
        registerAgencyRequest.password,
      );
    return Result.ok(registerAgencyResponse);
  }
}
