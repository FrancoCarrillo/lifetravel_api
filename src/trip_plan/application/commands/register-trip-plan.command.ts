export class RegisterTripPlan {
	constructor(
		public readonly clientId: number,
		public readonly planId: number,
		public readonly promotion: number,
		public readonly paymentId: number,
	) { }
}
