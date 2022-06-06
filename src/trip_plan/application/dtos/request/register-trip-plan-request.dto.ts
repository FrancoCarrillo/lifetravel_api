export class RegisterTripPlanRequestDto {
	constructor(
		public readonly client_id: number,
		public readonly plan_id: number,
		public readonly promotion: number
	) { }
}
