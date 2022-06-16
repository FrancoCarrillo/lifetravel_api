/* eslint-disable prettier/prettier */
import { CommandBus, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPaymentIdQuery } from "../../queries/get-payment-id.query";
import { getManager } from "typeorm";
import { AddPayment } from "src/payments/application/commands/add-payment.command";

@QueryHandler(GetPaymentIdQuery)
export class GetPaymentIdHandler implements IQueryHandler<GetPaymentIdQuery> {
	constructor(private commandBus: CommandBus,) { }

	async execute(query: GetPaymentIdQuery) {
		const { client_id, plan_id, promotion } = query
		const manager = getManager();
		const sql = `
    SELECT 
      price
    FROM 
      plans
		WHERE id = ${plan_id.toString()}`;

		const ormPrice = await manager.query(sql); // { price : 10}

		if (ormPrice === null) {
			return {}
		};

		const pricePlan = 0;

		// client_id, price, promotion
		const payment_id: number = await this.commandBus.execute(new AddPayment(client_id, pricePlan, promotion));

		return payment_id;
	}

}