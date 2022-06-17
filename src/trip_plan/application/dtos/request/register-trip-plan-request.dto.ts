export class RegisterTripPlanRequestDto {
  constructor(
    public readonly user_id: number,
    public readonly number: string,
    public readonly dni: string,
    public readonly plan_id: number,
    public readonly promotion: number,
  ) {}
}
