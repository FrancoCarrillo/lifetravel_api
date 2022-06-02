export class AddPayment {
  constructor(
    public readonly clientId: number,
    public readonly price: number,
    public readonly promotion: string
  ) {}
}