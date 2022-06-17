export class AddPlanResponseDto {
  constructor(
    public id: number,
    public readonly price: number,
    public readonly travelDays: number,
    public readonly cityId: number,
    public readonly description: number
  ) {}
}