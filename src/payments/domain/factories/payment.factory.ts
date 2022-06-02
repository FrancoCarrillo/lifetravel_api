import { Payment } from "../entities/payment.entity";

export class PaymentFactory {
  public static createFrom(id: number, clientId: number, price: number) : Payment {
    return new Payment(id, clientId, price);
  }
}