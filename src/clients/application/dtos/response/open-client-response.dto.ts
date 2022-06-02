export class OpenClientResponse {
  constructor(
    public id: number,
    public userId: number,
    public number: string,
    public dni: string,
    public miles: number
  ) {}
}
