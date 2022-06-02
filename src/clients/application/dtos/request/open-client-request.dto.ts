export class OpenClientRequest {
  constructor(
    public readonly userId: number,
    public readonly accountNumber: string,
    public readonly dni: string,
  ) {}
}
