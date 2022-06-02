import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaymentTypeORM } from "../../infrastructure/persistence/typeorm/entities/payment.typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddPaymentRequestDto } from "../dtos/request/add-payment-request.dto";
import { AppNotification } from "../../../common/application/app.notification";

@Injectable()
export class AddPaymentValidator {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>
  ) {}

  public async validate(
    addPaymentDto: AddPaymentRequestDto
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const price: number = addPaymentDto.price;
    if(price <= 0){
      notification.addError('The price must be greater than zero', null);
    }

    const clientId: number = addPaymentDto.clientId;
    if(clientId <= 0){
      notification.addError('The client id must be greater than zero', null);
    }

    const promotion: string = addPaymentDto.promotion;
    if(promotion !== 'S' && promotion !== 'N'){
      notification.addError('The promotion can only have a value of S or N', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    //Validar si el cliente existe

    return notification;
  }
}