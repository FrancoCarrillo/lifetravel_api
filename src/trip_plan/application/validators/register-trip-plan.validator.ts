/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppNotification } from '../../../common/application/app.notification';

import { ClientTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { PlanTypeORM } from 'src/services/infrastructure/persistence/typeorm/entities/plan.typeorm';
import { UserTypeORM } from 'src/users/infrastructure/persistence/typeorm/entities/user.typeorm';
import { RegisterTripPlanRequestDto } from '../dtos/request/register-trip-plan-request.dto';

@Injectable()
export class RegisterTripPlanValidator {
	constructor(
		@InjectRepository(UserTypeORM)
		private userRepository: Repository<UserTypeORM>,
		@InjectRepository(ClientTypeORM)
		private clientRepository: Repository<ClientTypeORM>,
		@InjectRepository(PlanTypeORM)
		private planRepository: Repository<PlanTypeORM>,
	) { }

	public async validate(
		registerTripPlanRequestDto: RegisterTripPlanRequestDto
	): Promise<AppNotification> {
		const notification: AppNotification = new AppNotification();

		const number: string = registerTripPlanRequestDto.number.trim();
		if (number.length <= 0) {
			notification.addError('Account number is required', null);
		}

		const dni: string = registerTripPlanRequestDto.dni.trim();
		if (dni.length <= 0) {
			notification.addError('DNI is required', null);
		}

		if (notification.hasErrors()) {
			return notification;
		}
		const clientTypeORM: ClientTypeORM = await this.clientRepository
			.createQueryBuilder()
			.where('dni = :dni', { dni })
			.getOne();

		if (clientTypeORM != null) {
			notification.addError('DNI is taken', null);
		}
		
		const user = await this.userRepository.findOne({
			where: {
				id: registerTripPlanRequestDto.user_id,
			},
		});

		// Validar si el user_id existe en la db
		if (user == null) {
			notification.addError(
				'The client id does not exist in the database',
				null
			);
		}

		const plan = await this.planRepository.findOne({
			where: {
				id: registerTripPlanRequestDto.plan_id,
			},
		});

		// Validar si el plan_id existe en la db
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

		const userTypeORM: UserTypeORM = await this.userRepository
			.createQueryBuilder()
			.where("id = :id")
			.setParameter("id", registerTripPlanRequestDto.user_id)
			.getOne();

		if (userTypeORM == null) {
			notification.addError('User not found', null);
		}

		if (userTypeORM.type !== 'T') {
			notification.addError('The user type must be traveler', null);
		}


		return notification;
	}
}
