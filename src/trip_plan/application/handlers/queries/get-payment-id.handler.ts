/* eslint-disable prettier/prettier */
import { CommandBus, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPaymentIdQuery } from "../../queries/get-payment-id.query";
import { getManager, Repository } from "typeorm";
import { AddPayment } from "src/payments/application/commands/add-payment.command";
import { ClientTypeORM } from "../../../../common/infrastructure/persistence/typeorm/entities/client.typeorm";
import { PlanTypeORM } from "../../../../services/infrastructure/persistence/typeorm/entities/plan.typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetPaymentIdQuery)
export class GetPaymentIdHandler implements IQueryHandler<GetPaymentIdQuery> {
	constructor(
		private commandBus: CommandBus,
		@InjectRepository(PlanTypeORM)
		private planRepository: Repository<PlanTypeORM>
		) { }

	async execute(query: GetPaymentIdQuery) {
		const { client_id, plan_id, promotion } = query

		const planTypeORM: PlanTypeORM = await this.planRepository.createQueryBuilder()
			.where("id= :id")
			.setParameter("id", query.plan_id)
			.getOne();



		const pricePlan = planTypeORM.price;

		// client_id, price, promotion
		const payment_id: number = await this.commandBus.execute(new AddPayment(client_id, pricePlan, promotion));

		return payment_id;
	}

}