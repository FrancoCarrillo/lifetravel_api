import { TripPlan } from "../../domain/entities/trip-plan.entity";
import { TripPlanTypeORM } from "../../infrastructure/persistence/typeorm/entities/tripPlan.typeorm";

export class TripPlanMapper {
	public static toTypeORM(tripPlan: TripPlan): TripPlanTypeORM {
		const tripPlanTypeORM: TripPlanTypeORM = new TripPlanTypeORM();
		tripPlanTypeORM.id = tripPlan.id;
		tripPlanTypeORM.payment_id = tripPlan.payment_id;
		tripPlanTypeORM.client_id = tripPlan.client_id;
		tripPlanTypeORM.plan_id = tripPlan.plan_id;
		tripPlanTypeORM.promotion = tripPlan.promotion;

		return tripPlanTypeORM;
	}
}

