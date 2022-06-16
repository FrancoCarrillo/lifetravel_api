/* eslint-disable prettier/prettier */
import { CommandBus, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetClientIdQuery } from "../../queries/get-client-id.query";
import { OpenClient } from "../../../../clients/application/commands/open-client.command"

@QueryHandler(GetClientIdQuery)
export class GetClientIdHandler implements IQueryHandler<GetClientIdQuery> {
	constructor(private commandBus: CommandBus,) { }

	async execute(query: GetClientIdQuery) {
		const { user_id, number, dni } = query

		const client_id: number = await this.commandBus.execute(new OpenClient(user_id, number, dni));

		return client_id;
	}

}