export class AddPlanRequestDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly nameCity: string,
    public readonly nameCountry: string,
    public readonly nameMoney: string,
    public readonly changeValue_money: number,
    public readonly kindCityName: string,
    public readonly kindCityDescription: string,
    public readonly price: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly clientsId: number,
  ) {}
}
