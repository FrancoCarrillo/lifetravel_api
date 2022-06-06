/* eslint-disable prettier/prettier */
export class GetPaymentIdQuery {
	constructor(public readonly client_id: number, public readonly plan_id: number, public readonly promotion: number) { }
}