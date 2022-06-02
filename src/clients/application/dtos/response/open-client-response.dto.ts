export class OpenClientResponse {
  constructor(
    public id: number,
    public accountNumber: string,
    public dni: string,
    public miles: number,
    public userId: number,
  ) {}
}
