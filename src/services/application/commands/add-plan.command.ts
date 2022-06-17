export class AddPlan {
  constructor(
    public  price: number,
    public readonly travelDays: number,
    public readonly cityId: number
  ) {}
}