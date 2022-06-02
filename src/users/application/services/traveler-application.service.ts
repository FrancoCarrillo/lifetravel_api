import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterTravelerValidator } from '../validators/register-traveler.validator';
import { RegisterTravelerRequest } from '../dtos/request/register-traveler-request.dto';
import { RegisterTravelerResponse } from '../dtos/response/register-traveler-response.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterTraveler } from '../commands/register-traveler.command';

@Injectable()
export class TravelerApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerTravelerValidator: RegisterTravelerValidator,
  ) {}

  async register(
    registerTravelerRequest: RegisterTravelerRequest,
  ): Promise<Result<AppNotification, RegisterTravelerResponse>> {
    const notification: AppNotification =
      await this.registerTravelerValidator.validate(registerTravelerRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerTraveler: RegisterTraveler = new RegisterTraveler(
      registerTravelerRequest.firstName,
      registerTravelerRequest.lastName,
      registerTravelerRequest.email,
      registerTravelerRequest.password,
    );
    const travelerId: number = await this.commandBus.execute(registerTraveler);
    const registerResponse: RegisterTravelerResponse =
      new RegisterTravelerResponse(
        travelerId,
        registerTravelerRequest.firstName,
        registerTravelerRequest.lastName,
        registerTravelerRequest.email,
        registerTravelerRequest.password,
      );
    return Result.ok(registerResponse);
  }
}
