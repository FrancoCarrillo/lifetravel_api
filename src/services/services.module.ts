import { Module } from '@nestjs/common';
import { CqrsModule, QueryHandler } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddPlanHandler } from "./application/handlers/commands/add-plan.handler";
import { PlansApplicationService } from "./application/services/plans-application.service";
import { PlansController } from "./api/plans.controller";
import { PlanTypeORM } from "./infrastructure/persistence/typeorm/entities/plan.typeorm";
import { AddPlanValidator } from "./application/validators/add-plan.validator";
import { CityTypeORM } from "./infrastructure/persistence/typeorm/entities/city.typeorm";
import { GetPlanHandler } from "./application/handlers/queries/get-plan.handler";

export const CommandHandlers = [AddPlanHandler];
export const QueryHandlers = [GetPlanHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PlanTypeORM, CityTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [PlansController],
  providers: [
    PlansApplicationService,
    AddPlanValidator,
    ...CommandHandlers,
    ...QueryHandlers,
  ]
})
export class ServicesModule {}