export class RegisterAgencyResponse {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
