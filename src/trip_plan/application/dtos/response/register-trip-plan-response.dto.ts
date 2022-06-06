export class RegisterTripPlanResponseDto {
	constructor(
		private readonly tripPlan_id: number,
		private readonly client_id: number,
		private readonly plan_id: number,
		private readonly promotion: number,
		private readonly payment_id: number,
	) { }
}