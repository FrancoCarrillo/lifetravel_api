/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { PlanTypeORM } from 'src/services/infrastructure/persistence/typeorm/entities/plan.typeorm';
import { Repository } from 'typeorm';

import { AppNotification } from '../../../common/application/app.notification';
import { RegisterTripPlanRequestDto } from '../dtos/request/register-trip-plan-request.dto';

@Injectable()
export class RegisterTripPlanValidator {
	constructor(
		@InjectRepository(ClientTypeORM)
		private clientRepository: Repository<ClientTypeORM>,
		@InjectRepository(PlanTypeORM)
		private planRepository: Repository<PlanTypeORM>,
	) { }

	public async validate(
		registerTripPlanRequestDto: RegisterTripPlanRequestDto
	): Promise<AppNotification> {
		let notification: AppNotification = new AppNotification();

		// Validar si el client_id existe en la db
		const client = await this.clientRepository.findOne({
			where: {
				id: registerTripPlanRequestDto.client_id,
			},
		});

		if (client == null) {
			notification.addError(
				'The client id does not exist in the database',
				null
			);
		}

		// Validar si el plan_id existe en la db
		const plan = await this.planRepository.findOne({
			where: {
				id: registerTripPlanRequestDto.plan_id,
			},
		});

		if (plan == null) {
			notification.addError(
				'The plan id does not exist in the database',
				null
			);
		}

		if (typeof (registerTripPlanRequestDto.promotion) !== "number") {
			notification.addError("The promotion must be a number", null);
		}

		if (registerTripPlanRequestDto.promotion !== 1 && registerTripPlanRequestDto.promotion !== 0) {
			notification.addError(
				'The promotion must be 1 or 0',
				null
			);
		}

		if (notification.hasErrors()) {
			return notification;
		}

		return notification;
	}
}
