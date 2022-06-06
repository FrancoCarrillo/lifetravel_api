/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { Result } from 'typescript-result';

import { TripPlanApplicationService } from '../application/services/trip-plan-application.service';
import { RegisterTripPlanRequestDto } from '../application/dtos/request/register-trip-plan-request.dto';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { RegisterTripPlanResponseDto } from '../application/dtos/response/register-trip-plan-response.dto';

@Controller('tripPlan')
export class TripPlanController {
	constructor(
		private readonly tripPlansApplicationService: TripPlanApplicationService,
	) { }

	@Post()
	async create(
		@Body() registerTripPlanRequestDto: RegisterTripPlanRequestDto,
		@Res({ passthrough: true }) response,
	): Promise<object> {
		try {
			const result: Result<AppNotification, RegisterTripPlanResponseDto> =
				await this.tripPlansApplicationService.create(
					registerTripPlanRequestDto,
				);
			if (result.isSuccess()) {
				return ApiController.created(response, result.value);
			}
			return ApiController.error(response, result.error.getErrors());
		} catch (error) {
			return ApiController.serverError(response, error);
		}
	}

}
