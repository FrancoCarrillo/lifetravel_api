import { Module } from '@nestjs/common';
import { CqrsModule, QueryHandler } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RegisterTripPlanHandler } from "./application/handlers/commands/register-trip-plan.handler";
import { TripPlanApplicationService } from "./application/services/trip-plan-application.service";
import { TripPlanController } from "./api/trip-plan.controller";
import { RegisterTripPlanValidator } from "./application/validators/register-trip-plan.validator";
import { TripPlanTypeORM } from "./infrastructure/persistence/typeorm/entities/tripPlan.typeorm";
import { GetPaymentIdHandler } from './application/handlers/queries/get-payment-id.handler';
import { PaymentTypeORM } from 'src/payments/infrastructure/persistence/typeorm/entities/payment.typeorm';
import { ClientTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { PlanTypeORM } from 'src/services/infrastructure/persistence/typeorm/entities/plan.typeorm';

export const CommandHandlers = [RegisterTripPlanHandler];
export const QueryHandlers = [GetPaymentIdHandler];

@Module({
  imports: [
    CqrsModule,
		TypeOrmModule.forFeature([TripPlanTypeORM,PaymentTypeORM,ClientTypeORM,PlanTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [TripPlanController],
  providers: [
		TripPlanApplicationService,
		RegisterTripPlanValidator,
    ...CommandHandlers,
    ...QueryHandlers,
  ]
})
export class TripPlanModule {}