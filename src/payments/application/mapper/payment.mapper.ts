import { Payment } from "../../domain/entities/payment.entity";
import { PaymentTypeORM } from "../../infrastructure/persistence/typeorm/entities/payment.typeorm";

export class PaymentMapper {
  public static toTypeORM(payment: Payment): PaymentTypeORM {
    const paymentTypeORM: PaymentTypeORM = new PaymentTypeORM();
    paymentTypeORM.id = payment.id;
    paymentTypeORM.price = payment.price;
    paymentTypeORM.clientId = payment.clientId;

    return paymentTypeORM;
  }
}