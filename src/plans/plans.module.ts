import { Module } from '@nestjs/common';
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddPlanHandler } from "./application/handlers/commands/add-plan.handler";
import { PlansApplicationService } from "./application/services/plans-application.service";
import { PlansController } from "./api/plans.controller";
import { PlanTypeORM } from "./infrastructure/persistence/typeorm/entities/plan.typeorm";
import { AddPlanValidator } from "./application/validators/add-plan.validator";

export const CommandHandlers = [AddPlanHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PlanTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [PlansController],
  providers: [
    PlansApplicationService,
    AddPlanValidator,
    ...CommandHandlers,
  ]
})
export class PlansModule {}