import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AddPayment } from "../../commands/add-payment.command";
import { Repository } from "typeorm";
import { PaymentTypeORM } from "../../../infrastructure/persistence/typeorm/entities/payment.typeorm";
import { Payment } from "../../../domain/entities/payment.entity";
import { PaymentFactory } from "../../../domain/factories/payment.factory";
import { PaymentMapper } from "../../mapper/payment.mapper";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(AddPayment)
export class AddPaymentHandler implements ICommandHandler<AddPayment> {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AddPayment) {
    let paymentId: number = 0;
    //modificar precio por descuento
    const price: number = command.price;
    const clientId: number = command.clientId;

    let payment: Payment = PaymentFactory.createFrom(paymentId, clientId, price);
    let paymentTypeORM: PaymentTypeORM = PaymentMapper.toTypeORM(payment);
    paymentTypeORM = await this.paymentRepository.save(paymentTypeORM);

    if(paymentTypeORM == null) {
      return paymentId;
    }

    paymentId = Number(paymentTypeORM.id);
    payment.changeId(paymentId);
    payment = this.publisher.mergeObjectContext(payment);
    payment.add();
    payment.commit();

    return paymentId;
  }
}