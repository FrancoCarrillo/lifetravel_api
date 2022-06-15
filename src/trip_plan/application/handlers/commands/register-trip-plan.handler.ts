/* eslint-disable prettier/prettier */
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { RegisterTripPlan } from "../../commands/register-trip-plan.command";
import { TripPlanMapper } from "../../mapper/trip-plan.mapper";
import { TripPlanFactory } from "src/trip_plan/domain/factories/trip-plan.factory";
import { TripPlan } from "src/trip_plan/domain/entities/trip-plan.entity";
import { TripPlanTypeORM } from "src/trip_plan/infrastructure/persistence/typeorm/entities/tripPlan.typeorm";

@CommandHandler(RegisterTripPlan)
export class RegisterTripPlanHandler implements ICommandHandler<RegisterTripPlan> {
	constructor(
		@InjectRepository(TripPlanTypeORM)
		private readonly tripPlanRepository: Repository<TripPlanTypeORM>,
		private readonly publisher: EventPublisher,
	) { }

	async execute(command: RegisterTripPlan) {
		let tripPlanId: number = 0;

		const clientId: number = command.clientId;
		const planId: number = command.planId;
		const paymentId: number = command.paymentId;
		const promotion: number = command.promotion;

		let tripPlan: TripPlan = TripPlanFactory.createFrom(tripPlanId, paymentId, clientId, planId, promotion);

		let tripPlanTypeORM: TripPlanTypeORM = TripPlanMapper.toTypeORM(tripPlan);
		tripPlanTypeORM = await this.tripPlanRepository.save(tripPlanTypeORM);

		if (tripPlanTypeORM == null) {
			return tripPlanId;
		}

		tripPlanId = Number(tripPlanTypeORM.id);
		tripPlan.changeId(tripPlanId);
		tripPlan = this.publisher.mergeObjectContext(tripPlan);
		tripPlan.open();
		tripPlan.commit();

		return tripPlanId;
	}
}