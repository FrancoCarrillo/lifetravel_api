export class ClientOpened {
  constructor(
    public readonly id: number,
    public readonly accountNumber: string,
    public readonly clientId: number,
  ) {}
}
