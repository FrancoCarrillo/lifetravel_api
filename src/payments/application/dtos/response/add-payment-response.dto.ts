export class AddPaymentResponseDto {
  constructor(
    public id: number,
    public readonly clientId: number,
    public readonly price: number,
    public readonly promotion: number
  ) {}
}