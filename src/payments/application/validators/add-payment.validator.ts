import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaymentTypeORM } from "../../infrastructure/persistence/typeorm/entities/payment.typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddPaymentRequestDto } from "../dtos/request/add-payment-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { ClientTypeORM } from "../../../common/infrastructure/persistence/typeorm/entities/client.typeorm";

@Injectable()
export class AddPaymentValidator {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>
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

    const promotion: number = addPaymentDto.promotion;
    if(promotion !== 0 && promotion !== 1){
      notification.addError('The promotion can only have a value of 0 or 1', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    const clientTypeORM: ClientTypeORM = await this.clientRepository.createQueryBuilder()
      .where("id= :id")
      .setParameter("id", clientId)
      .getOne();

    if(clientTypeORM == null){
      notification.addError("Client not found", null);
    }

    return notification;
  }
}