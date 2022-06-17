/* eslint-disable prettier/prettier */
import { CommandBus, EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetClientIdQuery } from "../../queries/get-client-id.query";
import { OpenClient } from "../../../../clients/application/commands/open-client.command"
import { ClientTypeORM } from "../../../../common/infrastructure/persistence/typeorm/entities/client.typeorm";
import { TripPlan } from "../../../domain/entities/trip-plan.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetClientIdQuery)
export class GetClientIdHandler implements IQueryHandler<GetClientIdQuery> {
	constructor(
		private commandBus: CommandBus,
		@InjectRepository(ClientTypeORM)
		private clientRepository: Repository<ClientTypeORM>,
		private publisher: EventPublisher,
		) { }

	async execute(query: GetClientIdQuery) {

		const clientTypeORM: ClientTypeORM = await this.clientRepository.createQueryBuilder()
			.where("user_id= :user_id")
			.setParameter("user_id", query.user_id)
			.getOne();

		let client_id: number;

		if(clientTypeORM != null) {
			client_id = clientTypeORM.id;
			let trip_plan: TripPlan = new TripPlan(null, null, client_id, null, null);
			trip_plan = this.publisher.mergeObjectContext(trip_plan);
			trip_plan.add();
			trip_plan.commit();
		}
		else
		{
			const { user_id, number, dni } = query
			client_id = await this.commandBus.execute(new OpenClient(user_id, number, dni));
		}
		return client_id;
	}

}