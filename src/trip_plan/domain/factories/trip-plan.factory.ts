import { TripPlan } from "../entities/trip-plan.entity";

export class TripPlanFactory {
	public static createFrom(id: number, payment_id: number, client_id: number, plan_id: number, promotion): TripPlan {
		return new TripPlan(id, payment_id, client_id, plan_id, promotion);
	}

}