export class AddPlanRequestDto {
  constructor(
    public readonly price: number,
    public readonly travelDays: number,
    public readonly cityId: number,
  ) {}
}
