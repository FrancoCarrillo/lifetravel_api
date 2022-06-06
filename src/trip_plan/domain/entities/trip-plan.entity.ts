import { AggregateRoot } from "@nestjs/cqrs";
import { TripPlanRegistered } from "../events/trip-plan-registered.event";

export class TripPlan extends AggregateRoot {

	constructor(
		public _id: number,
		public _payment_id: number,
		public _client_id: number,
		public _plan_id: number,
		public _promotion: number,
	) {
		super();
	}

	get id(): number {
		return this._id;
	}

	get payment_id(): number {
		return this._payment_id;
	}

	get client_id(): number {
		return this._client_id;
	}

	get plan_id(): number {
		return this._plan_id;
	}

	get promotion(): number {
		return this._promotion;
	}

	public changeId(id: number) {
		this._id = id;
	}

	public open() {
		const event = new TripPlanRegistered();
		this.apply(event);
	}
}