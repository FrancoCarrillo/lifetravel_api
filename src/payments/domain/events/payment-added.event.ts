export class PaymentAdded {
  constructor(
    public readonly id: number,
    public readonly clientId: number,
    public readonly price: number,
  ) {}
}