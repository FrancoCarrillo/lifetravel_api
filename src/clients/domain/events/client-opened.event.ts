export class ClientOpened {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly number: string,
    public readonly dni: string,
  ) {}
}
