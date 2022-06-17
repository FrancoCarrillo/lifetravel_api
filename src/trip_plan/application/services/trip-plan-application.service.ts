/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result } from "typescript-result";

import { AppNotification } from "../../../common/application/app.notification";
import { RegisterTripPlanRequestDto } from "../dtos/request/register-trip-plan-request.dto";
import { RegisterTripPlanResponseDto } from "../dtos/response/register-trip-plan-response.dto";
import { InjectRepository } from "@nestjs/typeorm";

import { RegisterTripPlanValidator } from "../validators/register-trip-plan.validator";
import { RegisterTripPlan } from "../commands/register-trip-plan.command";
import { GetPaymentIdQuery } from '../queries/get-payment-id.query';
import { GetClientIdQuery } from '../queries/get-client-id.query';
import { ClientTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { TripPlan } from 'src/trip_plan/domain/entities/trip-plan.entity';
import { ClientId } from 'src/clients/domain/value-objects/client-id.value';


@Injectable()
export class TripPlanApplicationService {
	constructor(
		/*Posible error*/
		@InjectRepository(ClientTypeORM)
    	private clientRepository: Repository<ClientTypeORM>,

		private commandBus: CommandBus,
		private queryBus: QueryBus,

		private registerTripPlanValidator: RegisterTripPlanValidator,
	) { }

	async create(
		registerTripPlanRequestDto: RegisterTripPlanRequestDto
	): Promise<Result<AppNotification, RegisterTripPlanResponseDto>> {

		const notification: AppNotification = await this.registerTripPlanValidator.validate(registerTripPlanRequestDto);
		const invalid_promotion = -1;

		if (notification.hasErrors()) {
			return Result.error(notification);
		}

		const { user_id, number, dni, plan_id, promotion } = registerTripPlanRequestDto;


		const client_id = await this.queryBus.execute(new GetClientIdQuery(user_id, number, dni));

		const payment_id: number = await this.queryBus.execute(new GetPaymentIdQuery(client_id, plan_id, promotion))

		if(payment_id == invalid_promotion){
			notification.addError("You don't have enough miles to get a promotion", null);
			return Result.error(notification);
		}
		const registerTripPlan: RegisterTripPlan = new RegisterTripPlan(
			client_id,
			plan_id,
			promotion,
			payment_id,
		);

		const tripPlan_id: number = await this.commandBus.execute(registerTripPlan);

		const registerTripPlanResponse: RegisterTripPlanResponseDto = new RegisterTripPlanResponseDto(
			tripPlan_id,
			client_id,
			plan_id,
			promotion,
			payment_id,
		);
		return Result.ok(registerTripPlanResponse);
	}
}
