import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { AddPaymentValidator } from "../validators/add-payment.validator";
import { AddPaymentRequestDto } from "../dtos/request/add-payment-request.dto";
import { AddPaymentResponseDto } from "../dtos/response/add-payment-response.dto";
import { AddPayment } from "../commands/add-payment.command";

@Injectable()
export class PaymentsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private addPaymentValidator: AddPaymentValidator,
  ) {}

  async add(
    addPaymentRequestDto: AddPaymentRequestDto
  ): Promise<Result<AppNotification, AddPaymentResponseDto>> {
    const notification: AppNotification = await this.addPaymentValidator.validate(addPaymentRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const addPayment: AddPayment = new AddPayment(
      addPaymentRequestDto.clientId,
      addPaymentRequestDto.price,
      addPaymentRequestDto.promotion
    );

    const paymentId: number = await this.commandBus.execute(addPayment);

    const addPaymentResponse: AddPaymentResponseDto = new AddPaymentResponseDto(
      paymentId,
      addPayment.clientId,
      addPayment.price,
      addPayment.promotion
    );
    return Result.ok(addPaymentResponse);
  }
}
