/* eslint-disable prettier/prettier */
export class GetClientIdQuery {
	constructor(public readonly user_id: number, public readonly number: string, public readonly dni: string) { }
}