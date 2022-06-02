import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ClientsApplicationService } from '../application/services/clients-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { OpenClientRequest } from '../application/dtos/request/open-client-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { OpenClientResponse } from '../application/dtos/response/open-client-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetClientsQuery } from '../application/queries/get-clients.query';
import { GetClientByIdQuery } from '../application/queries/get-client-by-id.query';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsApplicationService: ClientsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async open(
    @Body() openClientRequest: OpenClientRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenClientResponse> =
        await this.clientsApplicationService.open(openClientRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Get()
  async getClients(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const clients = await this.queryBus.execute(new GetClientsQuery());
      return ApiController.ok(response, clients);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Get('/:id')
  async getById(
    @Param('id') clientId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const clients = await this.queryBus.execute(new GetClientByIdQuery(clientId));
      return ApiController.ok(response, clients);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
