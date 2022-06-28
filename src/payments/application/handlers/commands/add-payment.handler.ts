import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AddPayment } from "../../commands/add-payment.command";
import { Repository } from "typeorm";
import { PaymentTypeORM } from "../../../infrastructure/persistence/typeorm/entities/payment.typeorm";
import { Payment } from "../../../domain/entities/payment.entity";
import { PaymentFactory } from "../../../domain/factories/payment.factory";
import { PaymentMapper } from "../../mapper/payment.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientTypeORM } from "../../../../common/infrastructure/persistence/typeorm/entities/client.typeorm";

@CommandHandler(AddPayment)
export class AddPaymentHandler implements ICommandHandler<AddPayment> {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AddPayment) {

    const invalid_promotion = -1;
    const topMiles = 300;
    const discount = 0.7;
    const promotionValid = 1;
    let paymentId: number = 0;
    let isPromotionAdd: boolean = false;
  

    let price: number = command.price;
    const clientId: number = command.clientId;

    if(command.promotion == promotionValid)
    {
      const client = await this.clientRepository.findOne({
        where: {
          id: command.clientId,
        },
      });

      if(client.miles.value >= topMiles)
      {
        price = price * discount;
        isPromotionAdd = true;
      }
      else
      {
        paymentId = invalid_promotion;
        return paymentId;
      }
    }

    let payment: Payment = PaymentFactory.createFrom(paymentId, clientId, price);
    let paymentTypeORM: PaymentTypeORM = PaymentMapper.toTypeORM(payment);
    paymentTypeORM = await this.paymentRepository.save(paymentTypeORM);

    if(paymentTypeORM == null) {
      return paymentId;
    }

    paymentId = Number(paymentTypeORM.id);
    payment.changeId(paymentId);
    payment = this.publisher.mergeObjectContext(payment);


    if(isPromotionAdd)
    {
      payment.addPromotion();
    }

    payment.commit();

    return paymentId;
  }
}