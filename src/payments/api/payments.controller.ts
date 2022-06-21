import { Body, Controller, Post, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { PaymentsApplicationService } from '../application/services/payments-application.service';
import { AddPaymentRequestDto } from '../application/dtos/request/add-payment-request.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsApplicationService: PaymentsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async add(
    @Body() addPaymentRequestDto: AddPaymentRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, AddPaymentRequestDto> =
        await this.paymentsApplicationService.add(addPaymentRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
