/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenClientValidator } from '../validators/open-client.validator';
import { OpenClientRequest } from '../dtos/request/open-client-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { OpenClientResponse } from '../dtos/response/open-client-response.dto';
import { OpenClient } from '../commands/open-client.command';

@Injectable()
export class ClientsApplicationService {
	constructor(
		private commandBus: CommandBus,
		private openClientValidator: OpenClientValidator,
	) { }

	async open(
		openClientRequestDto: OpenClientRequest,
	): Promise<Result<AppNotification, OpenClientResponse>> {
		const notification: AppNotification =
			await this.openClientValidator.validate(openClientRequestDto);
		if (notification.hasErrors()) {
			return Result.error(notification);
		}
		const openClient: OpenClient = new OpenClient(
			openClientRequestDto.userId,
			openClientRequestDto.number,
			openClientRequestDto.dni,
		);
		const clientId: number = await this.commandBus.execute(openClient);
		const openClientResponse: OpenClientResponse = new OpenClientResponse(
			clientId,
			openClient.userId,
			openClient.number,
			openClient.dni,
			300,

		);
		return Result.ok(openClientResponse);
	}
}
